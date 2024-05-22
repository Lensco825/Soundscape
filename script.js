var themeToggle = document.querySelector('.themeToggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('darkBody');
   if (document.body.classList.contains('darkBody')) {
    themeToggle.setAttribute("name", "sunny");
   }
   else {
    themeToggle.setAttribute("name", "moon");
   }
})