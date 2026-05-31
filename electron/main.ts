import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;

// 用户数据目录
const userDataPath = app.getPath('userData');
const dataDir = path.join(userDataPath, 'lyrics-studio-data');

// 确保数据目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 数据文件路径
const dataFilePath = path.join(dataDir, 'app-data.json');

// 数据结构
interface AppData {
  version: string;
  lyrics: any[];
  mvs: any[];
  user: any;
  settings: any;
  syncToken?: string;
  lastSyncAt?: string;
}

// 初始化或加载数据
function loadAppData(): AppData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load data:', e);
  }

  return {
    version: '1.0.0',
    lyrics: [],
    mvs: [],
    user: null,
    settings: {
      theme: 'dark',
      language: 'zh-CN'
    }
  };
}

// 保存数据
function saveAppData(data: AppData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

// 导出数据
function exportData(): string {
  try {
    if (fs.existsSync(dataFilePath)) {
      return fs.readFileSync(dataFilePath, 'utf-8');
    }
    return JSON.stringify({ version: '1.0.0', lyrics: [], mvs: [], user: null });
  } catch (e) {
    console.error('Failed to export data:', e);
    return JSON.stringify({ version: '1.0.0', lyrics: [], mvs: [], user: null });
  }
}

// 导入数据
function importData(dataStr: string): boolean {
  try {
    const data = JSON.parse(dataStr);
    saveAppData(data);
    return true;
  } catch (e) {
    console.error('Failed to import data:', e);
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: '歌词工坊',
    icon: path.join(__dirname, '../public/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 打开外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 注册IPC处理器
function registerIPCHandlers() {
  // 数据操作
  ipcMain.handle('data:load', () => loadAppData());
  ipcMain.handle('data:save', (_, data) => saveAppData(data));
  ipcMain.handle('data:export', () => exportData());
  ipcMain.handle('data:import', (_, dataStr) => importData(dataStr));

  // 文件操作
  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    if (result.canceled) return null;
    return result.filePaths[0];
  });

  ipcMain.handle('dialog:saveFile', async () => {
    const result = await dialog.showSaveDialog({
      defaultPath: 'lyrics-studio-data.json',
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ]
    });
    if (result.canceled) return null;
    return result.filePath;
  });

  // 平台信息
  ipcMain.handle('platform:getInfo', () => ({
    platform: process.platform,
    arch: process.arch,
    appVersion: app.getVersion(),
    dataPath: dataDir
  }));

  // 同步相关
  ipcMain.handle('sync:getToken', () => {
    const data = loadAppData();
    return data.syncToken || null;
  });

  ipcMain.handle('sync:setToken', (_, token) => {
    const data = loadAppData();
    data.syncToken = token;
    data.lastSyncAt = new Date().toISOString();
    saveAppData(data);
    return true;
  });
}

app.whenReady().then(() => {
  registerIPCHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});