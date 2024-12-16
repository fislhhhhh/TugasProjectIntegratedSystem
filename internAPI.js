document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jobicy.com/api/v2/remote-jobs?count=50';
    const jobsContainer = document.getElementById('otherA');

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
                    <img class="image-job" src="${job.companyLogo}" alt="Company Logo">
                    <h2 class="job-title">${job.jobTitle}</h2>
                    <p class="company-name">Company: ${job.companyName}</p>
                    <p class="company-name">Type: ${job.jobType}</p>
                    <p class="company-name">Level: ${job.jobLevel}</p>
               
                `;

                jobsContainer.appendChild(jobElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            jobsContainer.innerHTML = '<p>There was an error loading the job listings. Please try again later.</p>';
        });
});