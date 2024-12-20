import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCMb_NO8rIYtbLs4GhVb1YmKbjhUP5nzP8",
    authDomain: "integratedsystem-9fc21.firebaseapp.com",
    projectId: "integratedsystem-9fc21",
    storageBucket: "integratedsystem-9fc21.firebasestorage.app",
    messagingSenderId: "167441433188",
    appId: "1:167441433188:web:99f0ce1206f7ed96635571"
  };
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let recomfor= false;
localStorage.setItem('isSub', JSON.stringify(recomfor));

// Mendengarkan Status Login
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in as:", user.uid);
    } else {
        console.log("No user is logged in");
    }
});

// Form Handling
const profileForm = document.querySelector(".profile-form");

profileForm.addEventListener("submit", async (event) => {
    recomfor = true;
    event.preventDefault(); // Cegah reload halaman
    localStorage.setItem('isSub', JSON.stringify(recomfor));

    const namePro = document.getElementById("nickname").value;
    const fullnamePro = document.getElementById("full-name").value;
    const semesterPro = document.getElementById("semester").value;
    const uniPro = document.getElementById("university").value;
    const majorPro = document.getElementById("major").value;
    const nimPro = document.getElementById("nim").value;
    const proData = {
        Name: namePro,
        FullName: fullnamePro,
        Semester : semesterPro,
        Univeristy : uniPro,
        Major : majorPro,
        Nim : nimPro,
    };
    
    try {
        if (!auth.currentUser) {
        
            return;
        }
      
        const userProfile = doc(db, `users/${auth.currentUser.uid}/ProfileData/main`);
        await setDoc(userProfile, proData);
        alert("User Profile telah disimpan")
        profileForm.reset(); // Reset form
        
    } catch (error) {
        console.error("Error saving donation:", error);
  
    }
});
