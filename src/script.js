let audio = null;

const btn = document.getElementById('btn')
const list = document.getElementById('songs')

var songs = []

btn.addEventListener('click', async () => {
  await window.electronAPI.openFile()
  const filePath = await window.electronAPI.openFile()

  const tag = await window.electronAPI.changeImage()
  var artist = tag.artist
  var title = tag.title
  var titleSong = "" + title + " - " + artist

  var audio = new Audio(filePath)
  var controller = document.getElementById('control')

  songs.push(audio.src)

  document.getElementById('source').setAttribute('src', audio.src)
  controller.load()

  var span1 = document.createElement('span')
  span1.setAttribute('class', 'mdc-list-item__ripple')
  var span2 = document.createElement('span')
  span2.setAttribute('class', 'mdc-list-item__text')
  span2.innerHTML = titleSong
  
  var s = document.createElement('li');
  s.setAttribute('class', 'mdc-list-item')
  s.appendChild(span1)
  s.appendChild(span2)

  s.onclick = function() {
    document.getElementById('source').setAttribute('src', audio.src)
    console.log('uwu')
  }

  list.appendChild(s)
})