let isMenuVisible = false; 
const sideMenu = document.querySelector('.sideMenu');
function toggleMenu() {
    console.log('toggleMenu dipanggil');
    if (isMenuVisible) {
        sideMenu.classList.add('inactive');
      
    } else {
        sideMenu.classList.remove('inactive');
        
    }
   
    isMenuVisible = !isMenuVisible;
}
document.addEventListener('DOMContentLoaded', () => {
    sideMenu.classList.add('inactive');
});
window.onload = function() {
    sideMenu.classList.add('inactive');
}
