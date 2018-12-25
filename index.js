const electron = require('electron')
const { clipboard } = require('electron')

const clipboardWatcher = require('electron-clipboard-watcher')


function uponImgChange(nativeImage) {
  clipboardHistory[clipboardHistory.length] = nativeImage;
  let newItem = document.createElement("DIV")
    newItem.className = "linkItem"
  let img = document.createElement("IMG")
  img.src = nativeImage
  newItem.appendChild(img);

  let list = document.getElementById("historyList")
  list.appendChild(newItem);
  console.log(clipboardHistory)
}

function uponTxtChange(text){
  clipboardHistory[clipboardHistory.length] = text;
  let newItem = document.createElement("DIV")
    newItem.className = "linkItem"
  let newText = document.createTextNode(text)
  newItem.appendChild(newText);

  let list = document.getElementById("historyList")
  list.appendChild(newItem);
  console.log(clipboardHistory)
}

var clipboardHistory = [];

clipboardWatcher({
  watchDelay: 100,

  onImageChange: uponImgChange,

  onTextChange: uponTxtChange
})
