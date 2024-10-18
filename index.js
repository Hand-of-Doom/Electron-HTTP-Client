const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 650,
		minWidth: 490,
    height: 197,
		minHeight: 186,
  })

  win.loadFile('windows/main/index.html')
}

app.on('browser-window-created', (e, win) => win.removeMenu())

app.whenReady().then(createWindow)
