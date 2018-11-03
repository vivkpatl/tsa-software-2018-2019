//Let's get this module
const electron = require('electron')


// Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let window

//Some classes
const { app, BrowserWindow } = require('electron')

function createWindow() {
  //Create the dang window my dudes
  window = new BrowserWindow( { width: 800, height: 500} )

  //Make it have something to see using some HTML
  window.loadFile('index.html')


  // Emitted when the window is closed.
      window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null} )
}

//Fire when ready
app.on('ready', createWindow)

// Quit when all windows are closed.
 app.on('window-all-closed', () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {
     app.quit()
   }
 })

 app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
      createWindow()
    }
  })
