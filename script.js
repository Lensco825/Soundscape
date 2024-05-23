var themeToggle = document.querySelector('.themeToggle');
var playBtn = document.getElementById('playPause');
var isPlaying = false;

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('darkBody');
   if (document.body.classList.contains('darkBody')) {
    themeToggle.setAttribute("name", "sunny");
   }
   else {
    themeToggle.setAttribute("name", "moon");
   }
})

playBtn.addEventListener('click', function() {

    if (!isPlaying) {
        isPlaying = true;
        playBtn.setAttribut("name", "play");
    }
   else if (isPlaying) {
        isPlaying = false;
        playBtn.setAttribute("name", "pause");
    }
})