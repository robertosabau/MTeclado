const { contextBridge, ipcRenderer } = require('electron');

// Exponemos funciones seguras al proceso de renderizado (app.js)
contextBridge.exposeInMainWorld('electronAPI', {
    notificarEscritorio: (mensaje) => ipcRenderer.send('enviar-notificacion', mensaje)
});