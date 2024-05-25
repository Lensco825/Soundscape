var themeToggle = document.querySelector('.themeToggle');
var playBtn = document.getElementById('playPause');
let isPlaying = false;

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
        playBtn.setAttribute("name", "play");
        console.log("not playing");
        return;
    }
    if (isPlaying) {
         isPlaying = false;
         playBtn.setAttribute("name", "pause");
         console.log("playing!")
         return;
     }
})