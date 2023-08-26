// Mengambil elemen dari halaman
const orang = document.getElementById('orang') 
const playerScore = document.getElementById('score') 
const matiSound = document.getElementById("mati-sound") 
const loncatSound = document.getElementById("loncat-sound") 
const jalanSound = document.getElementById("jalan-sound") 

// Inisialisasi variabel skor dan pengontrol event
let score = 0 
let canTriggerEvent = true 

// Event Listener ketika karakter "orang" dihover
orang.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false 

    // Animasi karakter "orang" melompat dan memainkan suara loncat
    orang.style.top = '-250px'  // loncatin si mobilnya sebanyak 30 0px
    loncatSound.currentTime = 0  // Rewind the audio to the beginning

    loncatSound.play()

    // Setelah 1 detik, kembali ke posisi semula dan memainkan suara jalan
    setTimeout(() => {
      orang.style.top = '0px'  //jatuhin lagi mobilnya ke tempat semula
      jalanSound.currentTime = 0  // Rewind the audio to the beginning
      jalanSound.play()
    }, 1000) 

     // Setelah 1 detik, izinkan event lain untuk dipicu kembali
    setTimeout(() => {
        canTriggerEvent = true  // bolehin si eventnya buat ke trigger lagi setelah dijeda 1 detik
    }, 1000) 
  }
}) 

// Mengambil elemen-elemen lain dari halaman
const roadBackground = document.getElementById('road-background')
const roadBackground2 = document.getElementById('road-background-2')
const ghost = document.getElementById('ghost')
const bat = document.getElementById('bat')
const meledak = document.querySelector('.meledak')

let hasExecuted = false 

// Fungsi untuk memeriksa tabrakan antara karakter "orang" dan "ghost"
function checkCollision() {
    const orangRect = orang.getBoundingClientRect() 
    const ghostRect = ghost.getBoundingClientRect() 

      // Jika skor mencapai 500, tampilkan pesan kemenangan
    if (score == 500){
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
  
     // Jika terjadi tabrakan antara karakter "orang" dan "ghost"
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
        
          // Hentikan animasi, tampilkan efek ledakan, dan tampilkan pesan kalah
        stopAnimation()
        const explosionX = orangRect.left + (orangRect.width / 2) - 100  // ukuran ledakan
        const explosionY = orangRect.top + (orangRect.height / 2) - 100 
        explode(explosionX, explosionY) 
        playerScore.style.display = "none"

        let timerInterval
        Swal.fire({
          title: 'Kamu mati!',
          text: 'Kamu mati dengan skor ' + score,
          imageHeight: 200,
          imageAlt: 'dead',
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
          matiSound.currentTime = 0  // Rewind the audio to the beginning
          matiSound.play()

          hasExecuted = true 
    }   
  }

  // Fungsi untuk menghentikan animasi elemen-elemen dalam permainan
  function stopAnimation(){
    roadBackground.style.animationPlayState = 'paused' 
    roadBackground2.style.animationPlayState = 'paused' 
    ghost.style.animationPlayState = 'paused' 
    bat.style.animationPlayState = 'paused' 
    playerScore.style.display = "none"
  }

// Fungsi untuk menampilkan efek ledakan
  function explode(x, y) {
    meledak.style.left = `${x}px` 
    meledak.style.top = `${y}px` 
    meledak.style.display = 'block' 
  }
  
// Interval untuk meningkatkan skor dan memeriksa tabrakan
setInterval(() => {
    score++
    playerScore.innerHTML = `Score : ${score} ` 
    checkCollision() 
}, 100)
