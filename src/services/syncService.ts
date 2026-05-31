// 跨平台数据同步服务
// 支持Web、Desktop、Mobile三端数据互通

export interface SyncData {
  version: string;
  timestamp: number;
  deviceId: string;
  data: {
    lyrics: any[];
    mvs: any[];
    user: any;
    settings: any;
    membership: any;
  };
}

export interface SyncOptions {
  autoSync?: boolean;
  syncInterval?: number; // 毫秒
  syncToken?: string;
}

class CrossPlatformSyncService {
  private deviceId: string;
  private options: SyncOptions;
  private syncTimer: any = null;

  constructor(options: SyncOptions = {}) {
    this.options = {
      autoSync: false,
      syncInterval: 5 * 60 * 1000, // 默认5分钟
      ...options
    };
    this.deviceId = this.generateDeviceId();
  }

  // 生成设备ID
  private generateDeviceId(): string {
    const stored = this.getLocalStorage('deviceId');
    if (stored) return stored;

    const id = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    this.setLocalStorage('deviceId', id);
    return id;
  }

  // 检查平台类型
  public getPlatform(): 'web' | 'desktop' | 'mobile' {
    // 检查是否是Electron桌面应用
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      return 'desktop';
    }
    
    // 检查是否是Capacitor移动应用
    if (typeof (window as any).Capacitor !== 'undefined' && (window as any).Capacitor.isNative) {
      return 'mobile';
    }
    
    return 'web';
  }

  // 本地存储包装器
  private setLocalStorage(key: string, value: any): void {
    try {
      if (this.getPlatform() === 'desktop') {
        // Electron桌面应用
        // 数据通过electronAPI保存
      } else if (this.getPlatform() === 'mobile') {
        // Capacitor移动应用
        // 使用Preferences插件存储
        if (typeof (window as any).CapacitorPlugins?.Preferences !== 'undefined') {
          (window as any).CapacitorPlugins.Preferences.set({ key, value: JSON.stringify(value) });
        } else {
          // 回退到localStorage
          localStorage.setItem(key, JSON.stringify(value));
        }
      } else {
        // Web应用
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error('Failed to save to storage:', e);
    }
  }

  private getLocalStorage(key: string): any {
    try {
      if (this.getPlatform() === 'mobile') {
        if (typeof (window as any).CapacitorPlugins?.Preferences !== 'undefined') {
          return (window as any).CapacitorPlugins.Preferences.get({ key })
            .then((result: any) => result.value ? JSON.parse(result.value) : null);
        }
      }
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to load from storage:', e);
      return null;
    }
  }

  private removeLocalStorage(key: string): void {
    try {
      if (this.getPlatform() === 'mobile') {
        if (typeof (window as any).CapacitorPlugins?.Preferences !== 'undefined') {
          (window as any).CapacitorPlugins.Preferences.remove({ key });
          return;
        }
      }
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove from storage:', e);
    }
  }

  // 获取同步数据
  public async getSyncData(): Promise<SyncData> {
    let localData: any = {
      lyrics: [],
      mvs: [],
      user: null,
      settings: {},
      membership: {}
    };

    try {
      if (this.getPlatform() === 'desktop') {
        localData = await (window as any).electronAPI?.loadData() || localData;
      } else {
        localData = this.getLocalStorage('appData') || localData;
      }
    } catch (e) {
      console.error('Failed to get sync data:', e);
    }

    return {
      version: '1.0.0',
      timestamp: Date.now(),
      deviceId: this.deviceId,
      data: localData
    };
  }

  // 保存同步数据
  public async saveSyncData(data: SyncData): Promise<boolean> {
    try {
      if (this.getPlatform() === 'desktop') {
        await (window as any).electronAPI?.saveData(data.data);
      } else {
        this.setLocalStorage('appData', data.data);
      }
      this.setLocalStorage('lastSyncAt', Date.now());
      return true;
    } catch (e) {
      console.error('Failed to save sync data:', e);
      return false;
    }
  }

  // 导出数据（用于跨端同步）
  public async exportData(): Promise<string> {
    const syncData = await this.getSyncData();
    return JSON.stringify(syncData, null, 2);
  }

  // 导入数据
  public async importData(jsonData: string): Promise<boolean> {
    try {
      const syncData: SyncData = JSON.parse(jsonData);
      return await this.saveSyncData(syncData);
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  }

  // 下载数据文件
  public async downloadData(filename: string = 'lyrics-studio-data.json'): Promise<void> {
    const dataStr = await this.exportData();
    
    if (this.getPlatform() === 'desktop') {
      // 桌面端用文件保存对话框
      const filePath = await (window as any).electronAPI?.saveFileDialog();
      if (filePath) {
        // 在实际实现中，这里应该用fs保存文件
        console.log('Saved to:', filePath);
      }
    } else {
      // Web和移动端用下载API
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // 上传数据文件
  public async uploadData(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const text = await file.text();
          resolve(text);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  }

  // 自动同步（与服务器或通过文件交换）
  public startAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    if (this.options.autoSync) {
      this.syncTimer = setInterval(() => {
        this.autoSync();
      }, this.options.syncInterval);
    }
  }

  public stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  private async autoSync(): Promise<void> {
    console.log('Auto sync triggered');
    // 实际同步逻辑需要根据服务器API实现
    // 这里可以添加与后端API同步的逻辑
  }

  // 合并数据（解决冲突）
  public mergeData(local: SyncData, remote: SyncData): SyncData {
    // 简单的时间戳策略：选择最新的
    const newest = local.timestamp > remote.timestamp ? local : remote;
    const oldest = local.timestamp > remote.timestamp ? remote : local;

    // 合并歌词
    const mergedLyrics = this.mergeArrays(local.data.lyrics, remote.data.lyrics, 'id');
    const mergedMVs = this.mergeArrays(local.data.mvs, remote.data.mvs, 'id');

    return {
      ...newest,
      data: {
        ...newest.data,
        lyrics: mergedLyrics,
        mvs: mergedMVs
      }
    };
  }

  private mergeArrays<T extends { id: string }>(arr1: T[], arr2: T[], idKey: keyof T): T[] {
    const map = new Map<string, T>();
    
    [...arr1, ...arr2].forEach(item => {
      const existing = map.get(item[idKey] as string);
      if (!existing) {
        map.set(item[idKey] as string, item);
      }
      // 如果有更新时间，可以比较选择最新的
    });

    return Array.from(map.values());
  }
}

// 导出单例
export const syncService = new CrossPlatformSyncService({
  autoSync: false
});