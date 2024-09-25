// Function to fetch and display upcoming Sammelfahrten
async function fetchAndRenderUpcomingSammelfahrt() {
    try {
        const response = await fetch('https://stocherkahn-studenten.de/sammelfahrten/controller/get_upcoming_sammelfahrt.php');
        const data = await response.json();

        const container = document.getElementById('sammelfahrten-container');

        console.log(container);

        // Check if there's an error in the response
        if (data.error) {
            container.innerHTML = `<div class="alert alert-danger">Error: ${data.error}</div>`;
        } else {
            // Build the card using data from the API
            const card = document.createElement('div');
            card.classList.add('card');

            let state = 'In Planung';
            let color = '#E39A3B'; // Default color
            if (data.status === -1) {
                color = '#B62639'; // Abgesagt
                state = 'Abgesagt';
            } else if (data.status === 1) {
                color = '#98B36B'; // Bestätigt
                state = 'Bestätigt';
            }


            card.innerHTML = `
                <div class="card-body">
                    <div class="d-flex">
                        <h5 class="card-title">Öffentliche Stocherkahnfahrt</h5>
                    </div>
                    <p style="font-size: 1.1rem; margin: 0 0">
                        <i class="fa-regular fa-calendar" style="position: relative; bottom: 1px; margin-right: 5px"></i>
                        <span>${new Date(data.scheduledFor).toLocaleString()}</span>
                    </p>
                    <p style="font-size: 0.9rem; margin: 0 0">
                        Teilnehmer: ${data.totalMembers}
                        <span style="margin-left: 15px">Freie Plätze: ${data.seatsLeft}</span>
                    </p>
                    <p style="font-size: 0.9rem; margin: 0 0">
                        Status: <span style="color:${color}">${state}</span>
                    </p>
                </div>
                
                <p style="margin: 23px 0 10px 0; font-size: 1rem">
                    Bei einer öffentlichen Stocherkahnfahrt teilt ihr Euch einen Stocherkahn mit anderen Teilnehmern und bekommt eine Stadtführung von einem von uns!
                </p>
            `;

            // Append the card to the container
            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching Sammelfahrten:', error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    fetchAndRenderUpcomingSammelfahrt();
});