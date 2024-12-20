
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

document.addEventListener('DOMContentLoaded', async () =>  {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Logged in as:", user.uid);
        } else {
            console.log("No user is logged in");
        }
    });

    
    


    const ukmsRef = collection(db, `UKM`);
    const querySnapshot = await getDocs(ukmsRef);

    const jobsContainer = document.getElementById('otherA');
    querySnapshot.forEach((ukml) => {
        const data = ukml.data();
        console.log("Data fetched:", data); // Debugging
        const ukmElement = document.createElement('div');
        console.log(data.Description);
                ukmElement.className = 'job-listing';
                ukmElement.innerHTML = `
                    <p class="type-name">UKM</p>
                    <img class="image-job" src="${data.Image}" alt="Company Logo">
                    <h2 class="job-title">${data.Name}</h2>
                    <p class="company-name">Unit : ${data.Tipe}</p>
                    <div class="wrapJob"> 
                        <p class="job-type">${data.Bidang}</p>
                    </div>
                    <p class="job-industry">${data.url}</p>
               
                `;

                jobsContainer.appendChild(ukmElement);
                ukmElement.addEventListener('click', () => {
                    activityDesc.innerHTML = `
                    <div class="job-header">
                        <h2 class="jobD-title">${data.Name}</h2>
                        <div class="company-info">
                            <img class="imageD-job" src="${data.Image}" alt="Company Logo">
                            <div>
                                <p class="companyD-name">${data.Name}</p>
                                <p class="jobD-geo">${data.Bidang}</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn-lamar" onclick="window.open('${data.url}', '_blank')" >Daftar Sekarang</button>
                    <div class="jobD-meta">
                        <p class="jobD-type">${data.Tipe}</p>
                        <p class="jobD-level">${data.Bidang}</p>
                    </div>
                    <div class="job-description">
                        <h3>Description:</h3>
                        <p class="jobD-desc">${data.Description || 'No description available.'}</p>
                    </div>
                    
    
                    `;
                    const buttonLamar = document.querySelector(".btn-lamar");
                    if (buttonLamar) {
                        buttonLamar.addEventListener('click', async () => {
                            console.log("doc function:", doc);
                            const UKMRef = collection(db, `users/${auth.currentUser.uid}/UKMsaya`);
                            await setDoc(doc(UKMRef), data);
                        });
                    }
                });
    });

    const panitsRef = collection(db, `Kepanitiaan`);
    const queryPanit = await getDocs(panitsRef);


    queryPanit.forEach((panit) => {
        const data = panit.data();
        console.log("Data fetched:", data); // Debugging
        const panitElement = document.createElement('div');
        console.log(data.Description);
                panitElement.className = 'job-listing';
                panitElement.innerHTML = `
                    <p class="type-name">Kepanitiaan</p>
                    <img class="image-job" src="${data.Image}" alt="Company Logo">
                    <h2 class="job-title">${data.Posisi}</h2>
                    <p class="company-name">Event : ${data.Acara}</p>
                    <div class="wrapJob"> 
                        <p class="job-type">${data.Bidang}</p>
                    </div>
                    <p class="job-industry">${data.Divisi}</p>
               
                `;

                jobsContainer.appendChild(panitElement);
                panitElement.addEventListener('click', () => {
                    activityDesc.innerHTML = `
                    <div class="job-header">
                        <h2 class="jobD-title">${data.Posisi}</h2>
                        <div class="company-info">
                            <img class="imageD-job" src="${data.Image}" alt="Company Logo">
                            <div>
                                <p class="companyD-name">${data.Acara}</p>
                                <p class="jobD-geo">${data.Bidang}</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn-lamar" onclick="window.open('${data.url}', '_blank')" >Daftar Sekarang</button>
                    <div class="jobD-meta">
                        <p class="jobD-type">${data.Divisi}</p>
                        <p class="jobD-level">${data.Bidang}</p>
                    </div>
                    <div class="job-description">
                        <h3>Description:</h3>
                        <p class="jobD-desc">${data.Deskripsi || 'No description available.'}</p>
                    </div>
                    <div class="job-workload">
                        <h3>Workload:</h3>
                        <p class="jobD-desc">${data.Workload || 'No description available.'}</p>
                    </div>
                    `;
                    const buttonLamar = document.querySelector(".btn-lamar");
                    if (buttonLamar) {
                        buttonLamar.addEventListener('click', async () => {
                            const panitRef = collection(db, `users/${auth.currentUser.uid}/Kepanitiaansaya`);
                            await setDoc(doc(panitRef), data);
                            console.log("Data berhasil disimpan:", data);
                        });
                    }
                });
    });

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

            data.jobs.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.className = 'job-listing';

                jobElement.innerHTML = `
                    <p class="type-name">Intern</p>
                    <img class="image-job" src="${job.companyLogo}" alt="Company Logo">
                    <h2 class="job-title">${job.jobTitle}</h2>
                    <p class="company-name">Company : ${job.companyName}</p>
                    <div class="wrapJob"> 
                        <p class="job-type">${job.jobType}</p>
                        <p class="job-level">${job.jobLevel}</p>
                        <p class="job-geo">${job.jobGeo}</p>
                    </div>
                    <p class="job-industry">${job.jobIndustry}</p>
               
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
                        <p class="jobD-type">${job.jobType}</p>
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
            });
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            jobsContainer.innerHTML = '<p>There was an error loading the job listings. Please try again later.</p>';
        });
});

