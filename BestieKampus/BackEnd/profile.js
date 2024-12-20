import {  query, orderBy, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc,addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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


async function getLastUKM(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const lastUKM = collection(db, `users/${uid}/UKMsaya`);
        

        const querySnapshot = await getDocs(lastUKM);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0]; // Dokumen terakhir
            const lastData = lastDoc.data(); // Data dari dokumen terakhir

            console.log("Last donation data:", lastData);
            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("baruUKM").textContent = lastData.Name || "N/A";
            document.getElementById("posisiUKM").textContent = "Anggota Muda"|| "N/A";
            document.getElementById("baruUKMimg").src = lastData.Image|| "N/A";
            return lastData;
        } 
    } catch (error) {
        console.error("Error fetching last donation:", error);
        return null;
    }
}
async function getLastPanit(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const lastPanit = collection(db, `users/${uid}/Kepanitiaansaya`);
        

        const querySnapshot = await getDocs(lastPanit);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0]; // Dokumen terakhir
            const lastData = lastDoc.data(); // Data dari dokumen terakhir

            console.log("Last donation data:", lastData);
            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("baruPan").textContent = lastData.Acara || "N/A";
            document.getElementById("posisiPan").textContent = lastData.Posisi|| "N/A";
            document.getElementById("baruPanimg").src = lastData.Image|| "N/A";
            return lastData;
        } 
    } catch (error) {
        console.error("Error fetching last donation:", error);
        return null;
    }
}
async function getLastMagang(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const lastMagang = collection(db, `users/${uid}/Magang`);
        

        const querySnapshot = await getDocs(lastMagang);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0]; // Dokumen terakhir
            const lastData = lastDoc.data(); // Data dari dokumen terakhir

            console.log("Last donation data:", lastData);
            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("baruMag").textContent = lastData.companyName || "N/A";
            document.getElementById("posisiMag").textContent = lastData.jobTitle|| "N/A";
            document.getElementById("baruMagimg").src = lastData.companyLogo|| "N/A";
            return lastData;
        } 
    } catch (error) {
        console.error("Error fetching last donation:", error);
        return null;
    }
}
async function getProfile(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const userProfile = doc(db, `users/${uid}/ProfileData/main`);
        const querySnapshot = await getDoc(userProfile);
            const data = querySnapshot.data(); // Data dari dokumen terakhir

            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("namaPang").textContent = data.Name || "N/A";
            document.getElementById("jurus").textContent = data.Major|| "N/A";
            document.getElementById("fullNama").textContent = data.FullName|| "N/A";
            document.getElementById("smstr").textContent = data.Semester|| "N/A";
            document.getElementById("nimm").textContent = data.Nim|| "N/A";
            document.getElementById("univ").textContent = data.Univeristy|| "N/A";
            return data;
        
    } catch (error) {
        console.error("Error fetching last donation:", error);
        return null;
    }
}

async function generateImg(uid){
    const panitsRef = collection(db, `users/${uid}/Kepanitiaansaya`);
    const queryPanit = await getDocs(panitsRef);
    let count1 = 0; // Counter untuk membatasi iterasi maksimum

    queryPanit.forEach((panit) => {
        if (count1 >= 6) return; // Hentikan loop jika sudah mencapai 6 iterasi

        const data = panit.data();
        console.log("Data fetched:", data); // Debugging
        const panitElement = document.createElement('img');
        console.log(data.Description);
        const panitImgContainer = document.getElementById('badgeComit')
        panitElement.className = 'imgGrid';
        panitElement.src = data.Image;

        panitImgContainer.appendChild(panitElement);
        count1++; // Tambahkan counter setiap iterasi
    });


    const ukmRefs = collection(db, `users/${uid}/UKMsaya`);
    const queryUKM = await getDocs(ukmRefs);
    let count2 = 0; // Counter untuk membatasi iterasi maksimum

    queryUKM.forEach((UKM) => {
        if (count2 >= 6) return; // Hentikan loop jika sudah mencapai 6 iterasi

        const data = UKM.data();
        console.log("Data fetched:", data); // Debugging
        const UKMEle = document.createElement('img');
        console.log(data.Description);
        const UKMImgContainer = document.getElementById('badgeUKM')
        UKMEle.className = 'imgGrid';
        UKMEle.src = data.Image;

        UKMImgContainer.appendChild(UKMEle);
        count2++; 
    });

    const magRefs = collection(db, `users/${uid}/Magang`);
    const queryMag = await getDocs(magRefs);
    let count3 = 0; // Counter untuk membatasi iterasi maksimum

    queryMag.forEach((mag) => {
        if (count3 >= 6) return; // Hentikan loop jika sudah mencapai 6 iterasi

        const data = mag.data();
        console.log("Data fetched:", data); // Debugging
        const magEle = document.createElement('img');
        const MagImgContainer = document.getElementById('badgeMagang')
        magEle.className = 'imgGrid';
        magEle.src = data.companyLogo;

        MagImgContainer.appendChild(magEle);
        count3++; 
    });

}
async function countPoint(uid) {
    try {
        
        const poinUKMRef = collection(db, `users/${uid}/UKMsaya`);
        const poinPanitRef = collection(db, `users/${uid}/Kepanitiaansaya`);
        const poinMagangRef = collection(db, `users/${uid}/Magang`);

        const poinUKMSnapshot = await getDocs(poinUKMRef);
        const poinPanitSnapshot = await getDocs(poinPanitRef);
        const poinMagangSnapshot = await getDocs(poinMagangRef);

        const totalPoints =2* poinUKMSnapshot.size +1* poinPanitSnapshot.size +3* poinMagangSnapshot.size;

        console.log(`Total Points: ${totalPoints}`);
        document.getElementById("AktUKM").textContent = poinUKMSnapshot.size;
        document.getElementById("AktMagang").textContent = poinMagangSnapshot.size;
        document.getElementById("AktPanit").textContent = poinPanitSnapshot.size;
        document.getElementById("assetTotal").textContent = totalPoints || "N/A";
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in:", user.uid);
            getLastUKM(user.uid);
            getLastPanit(user.uid);
            getLastMagang(user.uid);
            countPoint(user.uid);
            generateImg(user.uid);
            getProfile(user.uid);
            

        } else {
            console.warn("No user logged in.");
        }
    });
});
