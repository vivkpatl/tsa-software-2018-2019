const electron = require('electron')
const { clipboard } = require('electron')
const { remote } = electron.remote

const nativeImg = require('electron').nativeImage

const clipboardWatcher = require('electron-clipboard-watcher')

//Reusable elements
function getCopyButton() {
  let copyButton = document.createElement("DIV")
    copyButton.className = "copyButton"
  let copyIcon = document.createTextNode("Copy")
    copyButton.appendChild(copyIcon)
  
  copyButton.addEventListener("click", function(e) {
    var element = e.target;
  
    while (element.className != "genericItem") {
      element = element.parentNode
    }
    
    //No need to have the item pop up again
    watcher.stop();

    //Capture the data we need
    var children = element.childNodes

    for (var i = 0; i < children.length; i++) {
      //If the data in question is text
      if (children[i].className == "descriptionText")
        clipboard.writeText(children[i].innerHTML)
      
      //If the data in question is an image
      if (children[i].className == "imagePreview") {
        var image = nativeImg.createFromDataURL(children[i].src)
        clipboard.writeImage(image);
      }
    }

    watcher = clipboardWatcher({
      watchDelay: 100,
    
      onImageChange: uponImageChange,
    
      onTextChange: uponTextChange
    })
  })

  return copyButton
}

function getDeleteButton() {
  let deleteButton = document.createElement("DIV")
    deleteButton.className = "deleteButton"
  let deleteIcon = document.createTextNode("Delete")
    deleteButton.appendChild(deleteIcon)

    deleteButton.addEventListener("click", function(e) {
      var element = e.target;

      while (element.className != "genericItem") {
        element = element.parentNode
      }
  
      element.WebkitAnimation = "fadeout 1s"
      element.style.animation = "fadeout 1s"
  
      setTimeout(function() { 
        element.parentNode.removeChild(element);
      }, 200);
    })

  return deleteButton
}

function uponImageChange(imageData) {
  clipboardHistory[clipboardHistory.length] = imageData

  let newImg = document.createElement("DIV")
  newImg.className = "genericItem"

  let img = document.createElement("IMG")
  img.className = "imagePreview"
  img.src = imageData.toDataURL()

  let newText = document.createElement("DIV")
    newText.className = "imageLabel"
  let imgTextNode = document.createTextNode("Image")
    newText.appendChild(imgTextNode)
  
  newImg.appendChild(img)
  newImg.appendChild(newText)
  newImg.appendChild(getDeleteButton())
  newImg.appendChild(getCopyButton())

  let list = document.getElementById("historyList")
  list.prepend(newImg)

  console.log(clipboardHistory)
}

function uponTextChange(text) {
  clipboardHistory[clipboardHistory.length] = text
  let newItem = document.createElement("DIV")
    newItem.className = "genericItem"

  let newDescriptionText = document.createElement("DIV")
    newDescriptionText.className = "descriptionText"
  let descriptionTextNode = document.createTextNode(text)
    newDescriptionText.appendChild(descriptionTextNode)

  let textLabel = document.createElement("DIV")
    textLabel.classList.add("textLabel")
    textLabel.appendChild(document.createTextNode("Text"))

    
  newItem.appendChild(textLabel)
  newItem.appendChild(newDescriptionText)
  newItem.appendChild(getDeleteButton())
  newItem.appendChild(getCopyButton())

  let list = document.getElementById("historyList")
  list.prepend(newItem)

  console.log(clipboardHistory)
}

var clipboardHistory = [];


//--------------------------------------------------------------------
//This is the magic portion
//--------------------------------------------------------------------
var watcher = clipboardWatcher({
  watchDelay: 100,

  onImageChange: uponImageChange,

  onTextChange: uponTextChange
})