import { app, BrowserWindow, ipcMain, Notification, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 520,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("session-ended", (_event, payload) => {
    const title = payload?.title || "Pomodoro";
    const body = payload?.body || "Session finished!";
    if (Notification.isSupported()) {
      const notification = new Notification({
        title,
        body,
      });
      notification.show();
    }
    shell.beep();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
