//Let's get this module
const electron = require('electron')
const { clipboard } = require('electron')

//This is important
const clipboardWatcher = require('electron-clipboard-watcher')

// Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
let window

//Some classes
const { app } = require('electron')
const path = require('path')
const Tray = electron.Tray
const { BrowserWindow } = require('electron')

const iconPath = path.join(__dirname, "assets/tray/favicon.ico")
const Menu = electron.Menu

let tray = null
function createWindow() {
  //Create the dang window my dudes
  window = new BrowserWindow( {frame: false, transparent: true, width: 320, height: 480} )

  //Make the window not resizable
  window.setResizable(false)

  //Make it have something to see using some HTML
  window.loadFile('index.html')

  //Test out some clipboard functionality
  clipboard.writeText('Example String')

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
    tray = new Tray(iconPath)

    //Menu in JSON form via an array with sublevels
    let template = [
      {
        label: 'ops',
        submenu: [
          {
            label: 'Option 1'
          },
          {
            label: 'Option 2'
          },
          {
            label: "Option 3"
          }
        ]
      }
    ]

      //This is some testing stuff for the tray menu
      const contextMenu = Menu.buildFromTemplate(template)
      tray.setContextMenu(contextMenu)

      //The name says it all
      createWindow()


      var clipboardHistory = [];

      clipboardWatcher({
      	watchDelay: 1000,

      	onImageChange: function(nativeImage) {
      		clipboardHistory[clipboardHistory.length] = nativeImage;
          console.log(clipboardHistory)
      	},

      	onTextChange: function(text){
      		clipboardHistory[clipboardHistory.length] = text;
          console.log(clipboardHistory)
      	}
      })


})



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
