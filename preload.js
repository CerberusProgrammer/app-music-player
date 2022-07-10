const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  changeImage: () => ipcRenderer.invoke('changeImage'),
  //changeImage: (filepath) => ipcRenderer.invoke('image:changeImage', filepath)
})
