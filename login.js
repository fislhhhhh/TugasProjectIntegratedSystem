  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyCMb_NO8rIYtbLs4GhVb1YmKbjhUP5nzP8",
    authDomain: "integratedsystem-9fc21.firebaseapp.com",
    projectId: "integratedsystem-9fc21",
    storageBucket: "integratedsystem-9fc21.firebasestorage.app",
    messagingSenderId: "167441433188",
    appId: "1:167441433188:web:99f0ce1206f7ed96635571"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  

  const submit = document.getElementById("loginButton");
  submit.addEventListener('click',function(event){
    event.preventDefault()
    const auth = getAuth();
    const email = document.getElementById("email1").value;
  const password = document.getElementById("psw1").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert('login akun...')
    alert('akun terlogin')
    window.location.href = "index2.html";
    onLogin = true;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  })
