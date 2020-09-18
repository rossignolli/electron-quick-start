const {app, BrowserWindow, ipcMain, Tray, ClientRequest} = require('electron');
const path = require('path');
const positioner = require('electron-traywindow-positioner');
const fetch = require('electron-fetch').default
const { v4: uuid_v4 } = require('uuid');
const si = require('systeminformation');


const iconPath = path.join(__dirname, 'jobicon.png')

let tray = undefined
let window = undefined



app.on('ready', () => {
  createTray()
  createWindow()
  si.osInfo().then(data => {
    
    data.id = uuid_v4()
      const body = data

        fetch('http://localhost:3333/', { 
          method: 'POST',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
      })
          .then(res => res.json())
          .then(json => console.log(json)).catch(err =>{
            console.log(err)
          })

     
     
     
  });
  
})


const createTray = () => {
  tray = new Tray(iconPath)
  tray.on('click', function (event) {
    toggleWindow()
  });
}


const createWindow = () => {
  window = new BrowserWindow({
    width: 320,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    transparent: false,
    skipTaskbar: false,
    webPreferences: {
      backgroundThrottling: true
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'index.html')}`)

  let trayBounds = tray.getBounds()
  positioner.position(window, trayBounds);

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
}

const showWindow = () => {
  // const position = getWindowPosition();
  // window.setPosition(position.x, position.y, false);
  let trayBounds = tray.getBounds()
  positioner.position(window, trayBounds);
  window.show();
}

ipcMain.on('show-window', () => {
  showWindow()
})