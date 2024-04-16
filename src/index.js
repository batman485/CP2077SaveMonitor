const { app, BrowserWindow, Notification, dialog, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const Store = require('./js/store.js');
let mainWindow;

const appName = "Cyberpunk 2077 Save Monitor";

const store = new Store({
  configName: 'preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 },
    saveLocation: ''
  }
});

let folderSelectoptions = {
  title : "Cyberpunk 2077 Save Location", 
  properties: ['openDirectory']
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  let { width, height } = store.get('windowBounds');

  if (process.platform === 'win32') {
    app.setAppUserModelId("com.cx3tech.cp2077-savemonitor");
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width, height, minWidth: 800, minHeight: 600, 
    icon: path.join(__dirname, 'images/icons/jackie_01.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Store bounds on resize
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.removeMenu();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//Handle Dark Mode
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }

  return nativeTheme.shouldUseDarkColors
})
ipcMain.handle('dark-mode:system', () => { nativeTheme.themeSouce = 'system' });

//Folder Handlers
ipcMain.on('folder:open', (event) => {
  dialog.showOpenDialog(mainWindow, folderSelectoptions).then((selection) => {
    let saveLocation = '';

    if(!selection.canceled){
      saveLocation = selection.filePaths[0];

      store.set('saveLocation', saveLocation);
      event.sender.send('folder:change', saveLocation);
    } else {
      event.sender.send('folder:change', saveLocation);
    }
  });
});

ipcMain.on('folder:get', (event) => {
  event.returnValue = store.get('saveLocation');
});

ipcMain.on('folder:sep', (event) => {
  event.returnValue = path.sep;
});

//Notification Handlers
ipcMain.on('notification:show', (event, save, size) => {
  const notification = {
    title: 'Cyberpunk 2077 Save Warning',
    body: save + ' is currently at ' + size + ' of 8 MB',
    icon: path.join(__dirname, 'images/icons/johnny_01.ico'),
  }

  console.log('Notification Sent');

  if(Notification.isSupported())
    new Notification(notification).show();
});