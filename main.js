const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
var jsmediatags = require('jsmediatags');

var file = null;
var tags = null;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{
      name: 'Music',
      extensions: ['mp3', 'ogg']
    }]
  });

  file = filePaths[0]

  jsmediatags.read(file, {
    onSuccess: (tag) => {
      tags = tag.tags;
    },

    onError: (error) => {
      console.log(error);
    }
  })

  if (canceled) {
    return
  } else {

    return filePaths[0]
  }
}

async function handleChangeImage() {
  return tags
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      autoHideMenuBar: true,
      width: 1500,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      },
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('src/index.html')
  mainWindow.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('openFile', handleFileOpen)
  ipcMain.handle('changeImage', handleChangeImage)

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
