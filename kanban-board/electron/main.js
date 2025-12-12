const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const indexPath = path.join(__dirname, '../www/index.html');
  console.log("Carregando arquivo:", indexPath);

  win.loadFile(indexPath);

  // Opcional: abrir devtools para ver erros
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
