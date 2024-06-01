var themeToggle = document.querySelector(".themeToggle");
var playBtn = document.getElementById("playPause");
var skipForward = document.getElementById("playForward");
var skipBack = document.getElementById("playBack");
var progressBar = document.querySelector(".progressBar");
var scrubber = document.querySelector(".scrubber");
let isPlaying = false;

function song(name, author, src) {
  this.name = name;
  this.author = author;
  this.src = new Audio(src);
}

const onceInParis = new song(
  "Once In Paris",
  "Pumpupthemind",
  "once-in-paris-168895.mp3"
);
const forHer = new song(
  "For Her",
  "Liderc",
  "for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3"
);
const etheralVistas = new song(
  "Etheral Vistas",
  "Denys_Brodovskyi",
  "ethereal-vistas-191254.mp3"
);
const solitude = new song(
  "Solitude",
  "lucafrancini",
  "solitude-dark-ambient-electronic-197737.mp3"
);
const glossy = new song("Glossy", "Coma-Media", "glossy-168156.mp3");

let songQue = [onceInParis, forHer, etheralVistas, solitude, glossy];
let currentIndex = 0;
let currentSong = songQue[currentIndex];

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("darkBody");
  if (document.body.classList.contains("darkBody")) {
    themeToggle.setAttribute("name", "sunny");
  } else {
    themeToggle.setAttribute("name", "moon");
  }
});

function moveProgress() {
  if (currentSong.src.currentTime >= 8) {
    scrubber.style.opacity = "1";
  } else {
    scrubber.style.opacity = "0";
  }
  progressBar.style.width = `${(currentSong.src.currentTime / currentSong.src.duration) * 100}%`;
}

setInterval(moveProgress, 1000);

playBtn.addEventListener("click", function () {
    
  if (!isPlaying) {
    isPlaying = true;
    playBtn.setAttribute("name", "play");
    console.log("not playing");
    currentSong.src.pause();
    return;
  }
  if (isPlaying) {
    isPlaying = false;
    playBtn.setAttribute("name", "pause");
    console.log("playing!");
    currentSong.src.play();
    return;
  }
});

skipForward.addEventListener("click", function () {
  if (currentSong.src.currentTime + 25 > currentSong.src.duration) {
    currentSong.src.currentTime = currentSong.src.duration - 1;
  } else {
    currentSong.src.currentTime = currentSong.src.currentTime + 25;
  }

  moveProgress();
});

skipBack.addEventListener("click", function () {
  currentSong.src.currentTime = currentSong.src.currentTime - 25;
  moveProgress();
});

function playNextAudio() {
  if (currentSong.src.currentTime >= currentSong.src.duration)
    {
      currentIndex++

      if (currentIndex < songQue.length) {
        currentSong.src = songQue[currentIndex].src;
        currentSong = songQue[currentIndex];
        currentSong.src.duration = 0;
        console.log(currentIndex);
        console.log(currentSong);
        currentSong.src.play();
        moveProgress();
      }
      else {
        console.log("All songs have been played!");
      }
    }
}

setInterval(playNextAudio, 500);

