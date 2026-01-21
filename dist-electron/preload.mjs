"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(channel, listener) {
    electron.ipcRenderer.on(channel, listener);
  },
  off(channel, listener) {
    electron.ipcRenderer.off(channel, listener);
  },
  send(channel, ...args) {
    electron.ipcRenderer.send(channel, ...args);
  },
  invoke(channel, ...args) {
    return electron.ipcRenderer.invoke(channel, ...args);
  }
});
electron.contextBridge.exposeInMainWorld("api", {
  scrapeUrl: (url) => electron.ipcRenderer.invoke("scrape-media", url),
  onUpdateStatus: (callback) => {
    electron.ipcRenderer.on("update-message", (_event, status) => {
      if (typeof status === "string") callback(status);
    });
  },
  onDownloadProgress: (callback) => {
    electron.ipcRenderer.on("download-progress", (_event, progress) => {
      if (typeof progress === "number") callback(progress);
    });
  }
});
