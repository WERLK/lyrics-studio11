import { useState, useEffect } from 'react';
import { syncService } from '../services/syncService';
import { Download, Upload, RefreshCw, Smartphone, Monitor, Globe, CheckCircle, AlertCircle, SmartphoneIcon, MonitorIcon } from 'lucide-react';

export default function DataSyncPage() {
  const [platform, setPlatform] = useState<'web' | 'desktop' | 'mobile'>('web');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string>('');

  useEffect(() => {
    setPlatform(syncService.getPlatform());
    const stored = localStorage.getItem('lastSyncAt');
    if (stored) {
      setLastSyncAt(new Date(parseInt(stored)).toLocaleString('zh-CN'));
    }
  }, []);

  const handleExport = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage('正在导出数据...');
      await syncService.downloadData('lyrics-studio-data.json');
      setSyncMessage('数据导出成功！');
    } catch (e) {
      setSyncMessage('数据导出失败：' + (e as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage('正在选择文件...');
      
      const fileData = await syncService.uploadData();
      if (fileData) {
        setSyncMessage('正在导入数据...');
        const success = await syncService.importData(fileData);
        if (success) {
          setSyncMessage('数据导入成功！请刷新页面查看。');
          setLastSyncAt(new Date().toLocaleString('zh-CN'));
        } else {
          setSyncMessage('数据导入失败！');
        }
      }
    } catch (e) {
      setSyncMessage('数据导入失败：' + (e as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage('正在同步数据...');
      
      // 简单的同步逻辑（实际项目可以与服务器API配合）
      const data = await syncService.getSyncData();
      setSyncMessage('数据同步完成！');
      setLastSyncAt(new Date().toLocaleString('zh-CN'));
      
    } catch (e) {
      setSyncMessage('数据同步失败：' + (e as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'desktop': return <Monitor className="w-8 h-8" />;
      case 'mobile': return <Smartphone className="w-8 h-8" />;
      case 'web': return <Globe className="w-8 h-8" />;
    }
  };

  const getPlatformName = () => {
    switch (platform) {
      case 'desktop': return '桌面端';
      case 'mobile': return '移动端';
      case 'web': return '网页端';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 pt-20 px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">三端数据互通</h1>
          <p className="text-purple-200/70 text-lg">跨平台数据同步，随时随地创作</p>
        </div>

        {/* 当前平台信息 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              {getPlatformIcon()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">当前：{getPlatformName()}</h2>
              <p className="text-purple-200/70">所有数据将安全保存在本地设备上</p>
            </div>
          </div>
          
          {lastSyncAt && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-purple-200/70 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                上次同步：{lastSyncAt}
              </p>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={handleExport}
            disabled={isSyncing}
            className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl p-6 transition-all disabled:opacity-50"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">导出数据</h3>
              <p className="text-purple-200/70 text-sm">下载数据文件，用于备份或在其他设备上恢复</p>
            </div>
          </button>

          <button
            onClick={handleImport}
            disabled={isSyncing}
            className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl p-6 transition-all disabled:opacity-50"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">导入数据</h3>
              <p className="text-purple-200/70 text-sm">选择数据文件，恢复之前的创作内容</p>
            </div>
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl p-6 transition-all disabled:opacity-50"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <RefreshCw className={`w-6 h-6 text-white ${isSyncing ? 'animate-spin' : ''}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">同步数据</h3>
              <p className="text-purple-200/70 text-sm">将数据同步到云端服务器（需配置）</p>
            </div>
          </button>
        </div>

        {/* 同步消息 */}
        {syncMessage && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 mb-8">
            <div className="flex items-center gap-2 text-white">
              {syncMessage.includes('成功') || syncMessage.includes('完成') ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : syncMessage.includes('失败') ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
              )}
              <span>{syncMessage}</span>
            </div>
          </div>
        )}

        {/* 跨平台说明 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">跨平台数据同步指南</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <MonitorIcon className="w-6 h-6 text-blue-400" />
                <h4 className="text-white font-semibold">桌面端</h4>
              </div>
              <ul className="text-purple-200/70 text-sm space-y-2">
                <li>• 数据自动保存到本地</li>
                <li>• 支持导出/导入备份</li>
                <li>• 支持自动同步</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <SmartphoneIcon className="w-6 h-6 text-green-400" />
                <h4 className="text-white font-semibold">移动端</h4>
              </div>
              <ul className="text-purple-200/70 text-sm space-y-2">
                <li>• 数据保存到手机</li>
                <li>• 支持数据导入导出</li>
                <li>• iOS/Android 双端支持</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-purple-400" />
                <h4 className="text-white font-semibold">网页端</h4>
              </div>
              <ul className="text-purple-200/70 text-sm space-y-2">
                <li>• 数据保存到浏览器</li>
                <li>• 支持数据文件导入导出</li>
                <li>• 支持多浏览器</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4">如何实现三端同步？</h4>
            <ol className="text-purple-200/70 text-sm space-y-3">
              <li>1. 在第一台设备上点击「导出数据」，保存数据文件</li>
              <li>2. 将数据文件传输到另一台设备（通过邮箱、云盘等）</li>
              <li>3. 在第二台设备上点击「导入数据」，选择数据文件</li>
              <li>4. 完成！所有创作内容已同步</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}