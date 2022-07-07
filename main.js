const { app, BrowserWindow, ipcMain } = require('electron');
const { dialog } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('src/index.html');
  win.webContents.openDevTools();

  win.on('ready-to-show', () => {
    win.show()
  })

  ipcMain.on('update-value', (event, arg) => {
    BrowserWindow.webContents.send('SendToRenderer', 'Vale from uwu')
    dialog.showOpenDialog();
  })
};

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});