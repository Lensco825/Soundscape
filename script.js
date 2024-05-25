var themeToggle = document.querySelector('.themeToggle');
var playBtn = document.getElementById('playPause');
var skipForward = document.getElementById('playForward');
var skipBack = document.getElementById('playBack');
var progressBar = document.querySelector('.progressBar');
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
    progressBar.style.width = `${music.currentTime}%`
}

setInterval(moveProgress, 1000);

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
    music.currentTime = music.currentTime + 25;
    moveProgress();
});

skipBack.addEventListener('click', function() {
    music.currentTime = music.currentTime - 25;
    moveProgress();
});