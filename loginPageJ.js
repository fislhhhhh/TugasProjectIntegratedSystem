// function toggleForm() {
//     const loginWrap = document.getElementById('loginWrap');
//     const signUpWrap = document.getElementById('signUpWrap');

//     document.getElementById('signUpWrap').classList.add('hidden');
// }

// // Menyembunyikan sign-up wrap secara default
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById('signUpWrap').classList.add('hidden');
// });
const dynamicImage = document.getElementById('loginWrap');
const description = document.getElementById('signUpWrap');
const loginDy = document.getElementById('loginPu');
const signUpDy = document.getElementById('signuPu');
const sideMenu = document.querySelector('.sideMenu');

let isImageVisible = true; 


function toggleContent() {
    if (isImageVisible) {
        dynamicImage.classList.remove('active');
        dynamicImage.classList.add('inactive');
        description.classList.remove('inactive');
        description.classList.add('active');
    } else {
        
        description.classList.remove('active');
        description.classList.add('inactive');
        dynamicImage.classList.remove('inactive');
        dynamicImage.classList.add('active');
        
    }
   
    isImageVisible = !isImageVisible;
}
let isMenuVisible = false; 
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
window.toggleMenu = toggleMenu;
loginDy.addEventListener('click', function(event) {
    event.preventDefault(); 
});

signUpDy.addEventListener('click', function(event) {
    event.preventDefault(); 
}); 

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

window.onload = function() {
    dynamicImage.classList.add('active');
    description.classList.add('inactive');
    sideMenu.classList.add('inactive');
}
const onLogin = false;

function scrollMeetKampus(){
    if(!onLogin){
        alert("Silahkan login atau sign up terlebih dahulu sebelum memasuki aplikasi");
        scrollToSection('loginHal1');
    }
}
