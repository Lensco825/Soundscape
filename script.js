var themeToggle = document.querySelector(".themeToggle");
var playBtn = document.getElementById("playPause");
var skipForward = document.getElementById("playForward");
var skipBack = document.getElementById("playBack");
var progressBar = document.querySelector(".progressBar");
var scrubber = document.querySelector(".scrubber");
var coverImg = document.querySelector('.coverImg');
var songName = document.querySelector('.songName');
let isPlaying = false;

function song(name, author, src, img) {
  this.name = name;
  this.author = author;
  this.src = new Audio(src);
  this.img = img;
}

const onceInParis = new song(
  "Once In Paris",
  "Pumpupthemind",
  "once-in-paris-168895.mp3"
);
const forHer = new song(
  "For Her",
  "Liderc",
  "for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3",
  "https://cdn.pixabay.com/audio/2024/04/14/22-20-51-951_200x200.jpg"
);
const etheralVistas = new song(
  "Etheral Vistas",
  "Denys_Brodovskyi",
  "ethereal-vistas-191254.mp3",
  "https://cdn.pixabay.com/audio/2024/02/14/21-04-08-947_200x200.png"
);
const solitude = new song(
  "Solitude",
  "lucafrancini",
  "solitude-dark-ambient-electronic-197737.mp3",
  "https://cdn.pixabay.com/audio/2024/03/22/19-00-46-73_200x200.jpg"
);
const glossy = new song("Glossy", "Coma-Media", "glossy-168156.mp3", "https://cdn.pixabay.com/audio/2024/03/04/18-30-15-842_200x200.jpeg");

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
        songName.textContent = songQue[currentIndex].name;
        coverImg.style.backgroundImage = `url('${songQue[currentIndex].img}')`;
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

setInterval(playNextAudio, 300);

