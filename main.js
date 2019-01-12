//Let's get this module
const electron = require('electron')
const { clipboard } = require('electron')

//This is important
const clipboardWatcher = require('electron-clipboard-watcher')

//Do we really need to use these? Isn't everything already being done through just one window?
//If we do need to use this, not exactly sure where the message would have to be recieved
//This tutorial -> https://coursetro.com/posts/code/122/Electron-IPC-Tutorial---Communication-within-your-Electron-App
// says that the reciever should be in the HTML file, but that doesn't seem right
const ipcM = require('electron').ipcMain
const ipcR = electron.ipcRenderer

// Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
let window

//Some classes
const { app } = require('electron')
const path = require('path')
const Tray = electron.Tray
const { BrowserWindow } = require('electron')




//Creates the main window of the application
function createWindow() {

  //Create the dang window my dudes with some CSSinJS options
  window = new BrowserWindow( {frame: false, transparent: true, width: 321, height: 481} )

  //Make the window not resizable
  window.setResizable(false)

  //Make it have something to see using some HTML
  window.loadFile('index.html')

  //Test out some clipboard functionality
  //clipboard.writeText('Example String')

  // Emitted when the window is closed.

  // TODO: Created a linked-list of all windows as that structure will properly
  // handle application flow in terms of which window becomes active upon
  // closing oen
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null} )

}

//Fire when ready
app.on('ready', function() {
      //The name says it all
      createWindow()
})



// Quit when all windows are closed.
 app.on('window-all-closed', () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
 })

 app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
      createWindow()
    }
  })

/*
  //Use IPCMain to recieve the clipboard history array from the other 'window'
  ipcM.on('clipboard-history', function (event, arg){
    win.webContents.send('history-array', arg)
  })
  */
