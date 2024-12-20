

import {  query, orderBy, limit, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
const isSubb = JSON.parse(localStorage.getItem('isSub'));
if (isSubb == true) {
document.addEventListener('DOMContentLoaded', async () =>  {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Logged in as:", user.uid);
        } else {
            console.log("No user is logged in");
        }
    });

    const jobsContainer = document.getElementById('recomA');
    const apiUrl = 'https://jobicy.com/api/v2/remote-jobs?count=50';
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data.jobs) || data.jobs.length === 0) {
            jobsContainer.innerHTML = '<p>No job listings found.</p>';
            return;
        }

        let count = 0; // Counter untuk membatasi jumlah yang ditampilkan
        data.jobs.forEach(job => {
            // Periksa apakah jobIndustry adalah array dan mengandung "software engineering"
            if (Array.isArray(job.jobIndustry) && job.jobIndustry.some(industry => industry.toLowerCase().includes("software engineering"))) {
                if (count >= 4) return; // Hentikan loop setelah 4 pekerjaan ditampilkan

                const jobElement = document.createElement('div');
                jobElement.className = 'job-listing';

                jobElement.innerHTML = `
                    <p class="type-name">Intern</p>
                    <img class="image-job" src="${job.companyLogo}" alt="Company Logo">
                    <h2 class="job-title">${job.jobTitle}</h2>
                    <p class="company-name">Company : ${job.companyName}</p>
                    <div class="wrapJob"> 
                        <p class="job-type">${job.jobType.join(", ")}</p>
                        <p class="job-level">${job.jobLevel}</p>
                        <p class="job-geo">${job.jobGeo}</p>
                    </div>
                    <p class="job-industry">${job.jobIndustry.join(", ")}</p>
                `;

                jobsContainer.appendChild(jobElement);
                jobElement.addEventListener('click', () => {
                    activityDesc.innerHTML = `
                    <div class="job-header">
                        <h2 class="jobD-title">${job.jobTitle}</h2>
                        <div class="company-info">
                            <img class="imageD-job" src="${job.companyLogo}" alt="Company Logo">
                            <div>
                                <p class="companyD-name">${job.companyName}</p>
                                <p class="jobD-geo">${job.jobGeo}</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn-lamar"  onclick="window.open('${job.url}', '_blank')">Lamar Sekarang</button>
                    <div class="jobD-meta">
                        <p class="jobD-type">${job.jobType.join(", ")}</p>
                        <p class="jobD-level">${job.jobLevel}</p>
                    </div>
                    <div class="job-description">
                        <h3>Description:</h3>
                        <p class="jobD-desc">${job.jobExcerpt || 'No description available.'}</p>
                    </div>
    
                    `;
                    const buttonLamar = document.querySelector(".btn-lamar");
                    if (buttonLamar) {
                        buttonLamar.addEventListener('click', async () => {
                            const aktivitasRef = collection(db, `users/${auth.currentUser.uid}/Magang`);
                            await setDoc(doc(aktivitasRef), job);
                        });
                    }
                });

                count++; // Increment counter untuk setiap pekerjaan yang ditampilkan
            }
        });

        // Jika tidak ada pekerjaan software yang ditemukan
        if (count === 0) {
            jobsContainer.innerHTML = '<p>No software-related job listings found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        jobsContainer.innerHTML = '<p>There was an error loading the job listings. Please try again later.</p>';
    });



    });
}
