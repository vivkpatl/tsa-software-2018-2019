const electron = require('electron')
const { clipboard } = require('electron')

const clipboardWatcher = require('electron-clipboard-watcher')


function uponImageChange(nativeImage) {
  clipboardHistory[clipboardHistory.length] = nativeImage
  let newImg = document.createElement("DIV")
  newImg.className = "genericItem"
  let img = document.createElement("IMG")
  img.id = "imagePreview"
  img.src = nativeImage.toDataURL()
  let newText = document.createTextNode("Image")
    newText.id = "imageText"
  newImg.appendChild(img)
  newImg.appendChild(newText)

  let list = document.getElementById("historyList")
  list.prepend(newImg)
  console.log(clipboardHistory)
}

function uponTextChange(text){
  clipboardHistory[clipboardHistory.length] = text
  let newItem = document.createElement("DIV")
    newItem.className = "genericItem"
  let newText = document.createTextNode(text)
    newText.id = "descriptionText"
    //newText.innerHTML = text
  newItem.appendChild(newText)

  let list = document.getElementById("historyList")
  list.prepend(newItem)
  console.log(clipboardHistory)
}

var clipboardHistory = [];

clipboardWatcher({
  watchDelay: 100,

  onImageChange: uponImageChange,

  onTextChange: uponTextChange
})
