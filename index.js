const electron = require('electron')
const { clipboard } = require('electron')

const clipboardWatcher = require('electron-clipboard-watcher')

function closeApp() {
  require('remote').app.quit()
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

  newImg.addEventListener("click", function(e) {
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

  let list = document.getElementById("historyList")
  list.prepend(newImg)

  console.log(clipboardHistory)
}

function uponTextChange(text){
  clipboardHistory[clipboardHistory.length] = text
  let newItem = document.createElement("DIV")
    newItem.className = "genericItem"

  let newDescriptionText = document.createElement("DIV")
    newDescriptionText.className = "descriptionText"
  let descriptionTextNode = document.createTextNode("Text")
    newDescriptionText.appendChild(descriptionTextNode)
  newItem.appendChild(newDescriptionText)


  newItem.addEventListener("click", function(e) {
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