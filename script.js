var themeToggle = document.querySelector(".themeToggle");
var playBtn = document.getElementById("playPause");
var skipForward = document.getElementById("playForward");
var skipBack = document.getElementById("playBack");
var progressBar = document.querySelector(".progressBar");
var scrubber = document.querySelector(".scrubber");
var coverImg = document.querySelector(".coverImg");
var songName = document.querySelector(".songName");

var isPlaying = false;

var songQueNames = document.querySelectorAll(".songQueName");
var songQueArtists = document.querySelectorAll(".songQueArtist");
var queueImages = document.querySelectorAll("#songQueImage");

var blobs = document.querySelectorAll(".blob");
var imageColors = [
  ["245, 245, 233", "178, 197, 205", "130, 86, 62"],
  ["206, 225, 163", "234, 178, 114", "216, 115, 64"],
  ["203, 131, 129", "139, 104, 110", "125, 151, 159"],
  ["61, 115, 111", "144, 159, 169", "32, 32, 48"],
  ["99, 108, 128", "92, 95, 105", "171, 161, 160"],
];

function song(name, author, src, img) {
  this.name = name;
  this.author = author;
  this.src = new Audio(src);
  this.img = img;
}

const onceInParis = new song(
  "Once In Paris",
  "Pumpupthemind",
  "resources/once-in-paris-168895.mp3",
  "https://cdn.pixabay.com/audio/2024/02/04/10-16-16-251_200x200.png"
);
const forHer = new song(
  "For Her",
  "Liderc",
  "resources/for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3",
  "https://cdn.pixabay.com/audio/2024/04/14/22-20-51-951_200x200.jpg"
);
const etheralVistas = new song(
  "Etheral Vistas",
  "Denys_Brodovskyi",
  "resources/ethereal-vistas-191254.mp3",
  "https://cdn.pixabay.com/audio/2024/02/14/21-04-08-947_200x200.png"
);
const solitude = new song(
  "Solitude",
  "lucafrancini",
  "resources/solitude-dark-ambient-electronic-197737.mp3",
  "https://cdn.pixabay.com/audio/2024/03/22/19-00-46-73_200x200.jpg"
);

const glossy = new song(
  "Glossy",
  "Coma-Media",
  "resources/glossy-168156.mp3",
  "https://cdn.pixabay.com/audio/2024/03/04/18-30-15-842_200x200.jpeg"
);

let songQue = [onceInParis, forHer, etheralVistas, solitude, glossy];
let currentSong = songQue[0];
songName.textContent = currentSong.name;
coverImg.style.backgroundImage = currentSong.src;
let upcomingSongs = [forHer, etheralVistas, solitude, glossy];

function reassign() {
  blobs[0].style.backgroundColor = `rgb(${imageColors[0][0]})`;
  blobs[1].style.backgroundColor = `rgb(${imageColors[0][1]})`;
  blobs[2].style.backgroundColor = `rgb(${imageColors[0][2]})`;

  for (let i = 0; i < songQue.length; i++) {
    songQueNames[i].textContent = songQue[i].name;
    songQueArtists[i].textContent = songQue[i].author;
    queueImages[i].setAttribute("src", `${songQue[i].img}`);
  }

  currentSong.src = songQue[0].src;
  currentSong = songQue[0];
  songName.textContent = songQue[0].name;
  coverImg.style.backgroundImage = `url('${songQue[0].img}')`;
  currentSong.src.duration = 0;
  moveProgress();
}

reassign();

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
  progressBar.style.width = `${
    (currentSong.src.currentTime / currentSong.src.duration) * 100
  }%`;
}

setInterval(moveProgress, 1000);

playBtn.addEventListener("click", function () {
  if (!isPlaying) {
    isPlaying = true;
    playBtn.setAttribute("name", "pause");
    console.log("not playing");
    currentSong.src.play();
    return;
  }
  if (isPlaying) {
    isPlaying = false;
    playBtn.setAttribute("name", "play");
    console.log("playing!");
    currentSong.src.pause();
    return;
  }
});

skipForward.addEventListener("click", function () {
  if (currentSong.src.currentTime + 25 >= currentSong.src.duration) {
    currentSong.src.currentTime = currentSong.src.duration - 1;
  } else {
    currentSong.src.currentTime = currentSong.src.currentTime + 25;
  }

  moveProgress();
});

skipBack.addEventListener("click", function () {
  currentSong.src.currentTime = currentSong.src.currentTime - 25;
  moveProgress();

  if (currentSong.src.currentTime - 25 <= 0) {
    playBackAudio();
  }
});

function playNextAudio() {
  let lastSong = songQue[0];
  let lastColors = imageColors[0];
  if (currentSong.src.currentTime >= currentSong.src.duration) {
    songQue.shift();
    songQue.push(lastSong);
    imageColors.shift();
    imageColors.push(lastColors);
    reassign();
    currentSong.src.play();
  }
}

function playBackAudio() {
  let thisSong = songQue[4];
  let theseColors = imageColors[4];
  if (currentSong.src.currentTime <= 0) {
    currentSong.src.pause();
    songQue.pop(songQue[4]);
    songQue.unshift(thisSong);
    imageColors.pop(imageColors[4]);
    imageColors.unshift(theseColors);
    currentSong.src.play();
    reassign();
  }
}

setInterval(playNextAudio, 300);
