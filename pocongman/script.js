const orang = document.getElementById('orang') 
const playerScore = document.getElementById('score') 
const deathSound = document.getElementById("death-sound") 
const jumpSound = document.getElementById("jump-sound") 
const landSound = document.getElementById("land-sound") 


let score = 0 
let canTriggerEvent = true 

orang.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false 

    orang.style.top = '-250px'  // loncatin si mobilnya sebanyak 30 0px
    jumpSound.currentTime = 0  // Rewind the audio to the beginning

    jumpSound.play()

    setTimeout(() => {
      orang.style.top = '0px'  //jatuhin lagi mobilnya ke tempat semula
      landSound.currentTime = 0  // Rewind the audio to the beginning
      landSound.play()
    }, 1000) 
    setTimeout(() => {
        canTriggerEvent = true  // bolehin si eventnya buat ke trigger lagi setelah dijeda 1 detik
    }, 1000) 
  }
}) 

const roadBackground = document.getElementById('road-background')
const roadBackground2 = document.getElementById('road-background-2')
const ghost = document.getElementById('ghost')
const bat = document.getElementById('bat')
const meledak = document.querySelector('.meledak')





let hasExecuted = false 

function checkCollision() {
    const orangRect = orang.getBoundingClientRect() 
    const ghostRect = ghost.getBoundingClientRect() 

    if (score == 1000){
      stopAnimation()
      Swal.fire({
        title: 'keren!',
        text: 'Kamu menang dengan skor ' + score,
      }).then((result) => {
        if(result.isConfirmed){
            window.location.reload()
        }
      })
    }
  
    if (orangRect.right - 50 > ghostRect.left + 10 && orangRect.bottom > ghostRect.top + 50 && orangRect.left + 50 <  ghostRect.right - 10 && !hasExecuted) 
    {
          // red overlay
        const overlay = document.createElement("div") 
        overlay.style.position = "fixed" 
        overlay.style.top = "0" 
        overlay.style.left = "0" 
        overlay.style.width = "100%" 
        overlay.style.height = "100%" 
        overlay.style.backgroundColor = "red" 
        overlay.style.opacity = "40%" 
        overlay.style.zIndex = "2" 

        document.body.appendChild(overlay) 
        
        stopAnimation()
        const explosionX = orangRect.left + (orangRect.width / 2) - 100  // ukuran ledakan
        const explosionY = orangRect.top + (orangRect.height / 2) - 100 
        explode(explosionX, explosionY) 
        playerScore.style.display = "none"

        let timerInterval
Swal.fire({
  title: 'kamu kalah!',
  html: 'lanjutin sana! <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
         .then((result) => {
            if(result.isConfirmed){
                window.location.reload()
            }
          })
          deathSound.currentTime = 0  // Rewind the audio to the beginning
          deathSound.play()

          hasExecuted = true 
    }   
  }

  function stopAnimation(){
    roadBackground.style.animationPlayState = 'paused' 
    roadBackground2.style.animationPlayState = 'paused' 
    ghost.style.animationPlayState = 'paused' 
    bat.style.animationPlayState = 'paused' 
    playerScore.style.display = "none"
  }


  function explode(x, y) {
    meledak.style.left = `${x}px` 
    meledak.style.top = `${y}px` 
    meledak.style.display = 'block' 
  }
  

setInterval(() => {
    score++
    playerScore.innerHTML = `Score : ${score} ` 
    checkCollision() 
}, 100)



