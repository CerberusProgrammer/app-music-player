const { ipcRenderer } = require("electron");

function buttonClick() {
    ipcRenderer.send("runScript");
}