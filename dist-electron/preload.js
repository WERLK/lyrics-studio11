import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
    saveFile: (content, filename) => {
        ipcRenderer.send('save-file', { content, filename });
    },
    openExternal: (url) => {
        ipcRenderer.send('open-external', url);
    },
});
