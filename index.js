const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 650,
    height: 197,
  })

  win.loadFile('windows/main/index.html')
}

app.whenReady().then(createWindow)
