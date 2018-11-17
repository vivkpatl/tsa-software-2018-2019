//never hurts to require this module to avoid a TON of ipcRenderer messages to ipcMain
const { clipboard } = require('electron')

//let's try this..... it should copy the text of the <p> above onto the clipboard
document.getElementById('testItem').addEventListener('click', function(err) {
  clipboard.writeText(document.getElementById('testItem').innerHTML)
})

document.getElementById('testItem').addEventListener('click', function(err) {
  clipboard.writeText(document.getElementById('testItem').innerHTML)
})
