document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation bar and the list of items
// Get the navigation bar and the list of items
const nav = document.querySelector('nav');
const navList = nav.querySelector('ul');

// Calculate the height of the navigation bar based on the number of list items
const navHeight = navList.offsetHeight;

// Set the max-height of the list to the height of the navigation bar minus any padding or margin
const navListMaxHeight = navHeight - (parseInt(getComputedStyle(navList).paddingTop) + parseInt(getComputedStyle(navList).paddingBottom) + parseInt(getComputedStyle(navList).marginTop) + parseInt(getComputedStyle(navList).marginBottom)) + 'px';
navList.style.maxHeight = navListMaxHeight;

// Add the 'scroll' class to the list if it exceeds the available height
if (navList.scrollHeight > navList.clientHeight) {
  navList.classList.add('scroll');
} else {
  navList.classList.remove('scroll');
}


  });
  