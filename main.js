const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
let jsmediatags = require('jsmediatags');

var file = null;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{
      name: 'Music',
      extensions: ['mp3', 'ogg']
    }]
  });

  if (canceled) {
    return
  } else {
    file = filePaths[0]
    return filePaths[0]
  }
}

function handleChangeImage() {
  jsmediatags.read(file, {
    onSuccess: (tag) => {
        var img = tag.tags.picture;

        if (img) {
            var base64String = "";

            for (var i = 0; i < img.data.length; i++) {
                base64String += String.fromCharCode(img.data[i]);
            }

            var base64 = "data:" + img.format + ";base64," + window.btoa(base64String);
            return base64;
        }
    },
    
    onError: (error) => {
        console.log(error);
    }
  })
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      width: 1500,
      height: 720,
      preload: path.join(__dirname, 'preload.js'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      },
    }
  })

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
