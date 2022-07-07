const { ipcRenderer } = require('electron')

function buttonClick() {
    ipcRenderer.send('update-value', 'Message from uwu')
}

ipcRenderer.on("SendToRenderer", function(event, arg) {
    console.log(arg)
})