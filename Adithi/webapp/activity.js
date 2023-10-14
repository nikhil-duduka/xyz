document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const destination = document.getElementById('origin').value;
    fetchActivities(destination);
});

function fetchActivities(destination) {
    const url = `http://localhost:8080/api/activities/${encodeURIComponent(destination)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayActivities(data, destination); // Pass the destination (user input) to the displayActivities function
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error, show a message or retry, etc.
        });
}

function displayActivities(activities, destination) {
    const activitiesContainer = document.getElementById('activitiesContainer');
    activitiesContainer.innerHTML = '';

    if (activities.length === 0) {
        activitiesContainer.innerHTML = '<p>No activities found for this destination.</p>';
        return;
    }

    activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'card'; // Use the existing 'card' class from your HTML
        activityDiv.innerHTML = `
            <header class="card__thumb">
                <a href="${activity.image_url}"><img src="${activity.image_url}" alt="${activity.activity_header}"/></a>
            </header>
            <div class="card__body">
                <div class="card__category"><a href="#">${activity.activity_header}</a></div>
                <h2 class="card__title"><a href="#">${activity.activity_header}</a></h2>
                <div class="card__subtitle">${destination}</div> <!-- Use the user input (destination) as the state name in the subtitle -->
                <p class="card__description">${activity.activity_text}</p>
            </div>
        `;
        activitiesContainer.appendChild(activityDiv);
    });
}
