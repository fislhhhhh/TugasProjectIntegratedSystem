  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCMb_NO8rIYtbLs4GhVb1YmKbjhUP5nzP8",
    authDomain: "integratedsystem-9fc21.firebaseapp.com",
    projectId: "integratedsystem-9fc21",
    storageBucket: "integratedsystem-9fc21.firebasestorage.app",
    messagingSenderId: "167441433188",
    appId: "1:167441433188:web:99f0ce1206f7ed96635571"
  };

  // Initialize Firebase
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const fstore = getFirestore(app);

// Function to save user data
async function saveUserData(userId, username) {
  try {
    console.log("Saving data to Firestore:", { userId, username });
    await setDoc(
      doc(fstore, "users", userId), // Koleksi "users"
      { username: username }, // Data yang disimpan
      { merge: true } // Tidak overwrite data lama jika ada
    );
    console.log("Data berhasil disimpan!");
  } catch (error) {
    console.error("Error menyimpan data:", error);
  }
}

// Handle registration
const submit = document.getElementById("registButton");
submit.addEventListener('click', async function (event) {
  event.preventDefault();
  console.log("Submit button clicked");

  const auth = getAuth();
  const email = document.getElementById("email2").value;
  const username = document.getElementById("uname2").value;
  const password = document.getElementById("psw2").value;

  try {
    console.log("Attempting to create user...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created:", user);

    console.log("Attempting to save user data...");
    await saveUserData(user.uid, username);

    alert("Akun terbuat!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});