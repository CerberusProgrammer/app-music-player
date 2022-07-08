const { app, BrowserWindow, ipcMain } = require('electron');
const { dialog } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });

  win.loadFile('src/index.html');
  win.webContents.openDevTools();

  win.on('ready-to-show', () => {
    win.show()
  })
};

async function playMusic() {
  let file = await dialog.showOpenDialog({
    filters: [{
      name: 'Music',
      extensions: ['mp3', 'ogg']
    }]
  });
}

ipcMain.on("runScript", (event, data) => {
  playMusic();
});



app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});