var themeToggle = document.querySelector('.themeToggle');
var playBtn = document.getElementById('playPause');
var skipForward = document.getElementById('playForward');
var skipBack = document.getElementById('playBack');
var progressBar = document.querySelector('.progressBar');
var scrubber = document.querySelector('.scrubber');
let isPlaying = false;
var music = new Audio("once-in-paris-168895.mp3");

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('darkBody');
   if (document.body.classList.contains('darkBody')) {
    themeToggle.setAttribute("name", "sunny");
   }
   else {
    themeToggle.setAttribute("name", "moon");
   }
})

function moveProgress() {
    if (music.currentTime >= 8) {
        scrubber.style.opacity = "1";
    }
    else {
        scrubber.style.opacity = "0";
    }
    progressBar.style.width = `${(music.currentTime / music.duration)*100}%`;
}

setInterval(moveProgress, 1000);

function song(name, author, src) {
    this.name = name;
    this.author = author;
    this.src = new Audio(src);
}

const onceInParis = new song("Once In Paris", "Pumpupthemind", "once-in-paris-168895.mp3");
const forHer = new song("For Her", "Liderc", "for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3");
const etheralVistas = new song("Etheral Vistas", "Denys_Brodovskyi", "ethereal-vistas-191254.mp3");
const solitude = new song("Solitude", "lucafrancini", "solitude-dark-ambient-electronic-197737.mp3");
const glossy = new song("Glossy", "Coma-Media", "glossy-168156.mp3");

let songQue = [onceInParis, forHer, etheralVistas, solitude, glossy];

playBtn.addEventListener('click', function() {

    if (!isPlaying) {
        isPlaying = true;
        playBtn.setAttribute("name", "play");
        console.log("not playing");
        music.pause()
        return;
    }
    if (isPlaying) {
         isPlaying = false;
         playBtn.setAttribute("name", "pause");
         console.log("playing!");
         music.play();
         return;
     }
})

skipForward.addEventListener('click', function() {
    if(music.currentTime + 25 > music.duration) {
        music.currentTime = music.duration;
    }
    else {
        music.currentTime = music.currentTime + 25;
    }

    moveProgress();
});

skipBack.addEventListener('click', function() {
    music.currentTime = music.currentTime - 25;
    moveProgress();
});