const electron = require('electron')
const { clipboard } = require('electron')

const clipboardWatcher = require('electron-clipboard-watcher')

function closeApp() {
  require('remote').app.quit()
}

//Reusable elements
function getCopyButton() {
  let copyButton = document.createElement("DIV")
    copyButton.className = "copyButton"
  let copyIcon = document.createElement("IMG")
    copyIcon.src = "assets/icons/ic_copy.png"
    copyButton.appendChild(copyIcon)
  
  copyButton.addEventListener("click", function(e) {
    var element = e.target;
  
    while (element.className != "genericItem") {
      element = element.parentNode
    }


    watcher.stop();

    //Only for text right now
    var children = element.childNodes

    for (var i = 0; i < children.length; i++) {
      if (children[i].className == "descriptionText")
      clipboard.writeText(children[i].innerHTML)
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
  let deleteIcon = document.createElement("IMG")
    deleteIcon.src = "assets/icons/ic_exit_small.png"
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

function uponImageChange(nativeImage) {
  clipboardHistory[clipboardHistory.length] = nativeImage

  let newImg = document.createElement("DIV")
  newImg.className = "genericItem"

  let img = document.createElement("IMG")
  img.className = "imagePreview"
  img.src = nativeImage.toDataURL()

  let newText = document.createElement("DIV")
    newText.className = "imageText"
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