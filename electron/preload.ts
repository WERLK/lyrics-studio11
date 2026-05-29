import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
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
      saveFile: (content: string, filename: string) => void;
      openExternal: (url: string) => void;
    };
  }
}
