import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // 数据操作
  loadData: () => ipcRenderer.invoke('data:load'),
  saveData: (data: any) => ipcRenderer.invoke('data:save', data),
  exportData: () => ipcRenderer.invoke('data:export'),
  importData: (dataStr: string) => ipcRenderer.invoke('data:import', dataStr),

  // 文件操作
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  saveFileDialog: () => ipcRenderer.invoke('dialog:saveFile'),

  // 平台信息
  getPlatformInfo: () => ipcRenderer.invoke('platform:getInfo'),

  // 同步操作
  getSyncToken: () => ipcRenderer.invoke('sync:getToken'),
  setSyncToken: (token: string) => ipcRenderer.invoke('sync:setToken', token),

  // 旧有API保持兼容性
  saveFile: (content: string, filename: string) => {
    ipcRenderer.send('save-file', { content, filename });
  },
  openExternal: (url: string) => {
    ipcRenderer.send('open-external', url);
  },
});

declare global {
  interface Window {
    electronAPI: {
      loadData: () => Promise<any>;
      saveData: (data: any) => Promise<void>;
      exportData: () => Promise<string>;
      importData: (dataStr: string) => Promise<boolean>;
      openFileDialog: () => Promise<string | null>;
      saveFileDialog: () => Promise<string | null>;
      getPlatformInfo: () => Promise<{
        platform: string;
        arch: string;
        appVersion: string;
        dataPath: string;
      }>;
      getSyncToken: () => Promise<string | null>;
      setSyncToken: (token: string) => Promise<boolean>;
      saveFile: (content: string, filename: string) => void;
      openExternal: (url: string) => void;
    };
  }
}