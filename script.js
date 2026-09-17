const { app, BrowserWindow } = require('electron');
const path = require('path');

function crearVentana() {
  // Configura las dimensiones de tu ventana nativa
  const ventana = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });
  
  ventana.setMenu(null); 

  // Indica qué interfaz visual va a cargar dentro de la ventana
  ventana.loadFile('index.html');
}

// Arranca la app cuando Electron esté listo
app.whenReady().then(() => {
  crearVentana();

  // Comportamiento típico de Mac al reactivar la app
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana();
  });
});

// Cierra la app por completo si se cierran todas las ventanas (excepto en Mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
