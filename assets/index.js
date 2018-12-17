const electron = require('electron')
const { clipboard } = require('electron')

const clipboardWatcher = require('electron-clipboard-watcher')


var clipboardHistory = [];

clipboardWatcher({
  watchDelay: 1000,

  onImageChange: function(nativeImage) {
    clipboardHistory[clipboardHistory.length] = nativeImage;
    //Use the IPC Renderer to send the new array to the IPC Main in the other 'window'
    //ipcR.send('clipboard-history', clipboardHistory)
    let newItem = document.createElement("DIV")
    let img = document.createElement("IMG")
    img.src = nativeImage
    newItem.appendChild(img);

    let list = document.getElementById("historyList")
    list.appendChild(newItem);
    console.log(clipboardHistory)
  },

  onTextChange: function(text){
    clipboardHistory[clipboardHistory.length] = text;
    //Use the IPC Renderer to send the new array to the IPC Main in the other 'window'
    //ipcR.send('clipboard-history', clipboardHistory)
    let newItem = document.createElement("DIV")
    let newText = document.createTextNode(text)
    newItem.appendChild(newText);

    let list = document.getElementById("historyList")
    list.appendChild(newItem);
    console.log(clipboardHistory)
  }
})
