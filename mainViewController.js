const clipboardWatcher = require(electron-clipboard-watcher)

var clipboardHistory = [];

clipboardWatcher({
  watchDelay: 250,

  onImageChange: function(nativeImage) {
    clipboardHistory[clipboardHistory.length] = nativeImage
    
    //Change an image and give it a try
    document.getElementById('testImage').href = nativeImage.toDataURL()

  },

  onTextChange: function(text){
    clipboardHistory[clipboardHistory.length] = text
    console.log(clipboardHistory)
  }
})