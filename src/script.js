const { ipcRenderer } = require("electron");
const { dialog } = require("electron");

function buttonClick() {
    ipcRenderer.send("runScript");
}