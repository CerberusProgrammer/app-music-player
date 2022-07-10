let audio = null;

const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath

  console.log(window.electronAPI.changeImage())

  let audio = new Audio(filePath)
  audio.play();

  //const base64 = window.electronAPI.changeImage(filePath)
  //document.getElementById('img').setAttribute('src', base64);
})