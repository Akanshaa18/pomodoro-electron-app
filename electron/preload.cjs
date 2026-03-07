const { contextBridge, ipcRenderer } = require("electron");

console.log("preload loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  notifySessionEnd: (payload) => ipcRenderer.send("session-ended", payload),
});
