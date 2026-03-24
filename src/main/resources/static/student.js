document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check if the user is actually logged in
    const studentId = localStorage.getItem('loggedInStudentId');
    const studentName = localStorage.getItem('loggedInStudentName');

    if (!studentId) {
        alert('You must be logged in to view this page.');
        window.location.href = 'index.html';
        return;
    }

    // 2. Personalize the welcome message
    document.getElementById('welcomeMessage').innerText = `Welcome, ${studentName}!`;

    // 3. Fetch the stats from your Spring Boot backend
    try {
        const response = await fetch(`https://clubtracker.onrender.com/students/${studentId}/hours`);
        
        if (response.ok) {
            const stats = await response.json();
            
            // Update the HTML with the real numbers from your database
            document.getElementById('totalHours').innerText = stats.totalHours;
            document.getElementById('remainingHours').innerText = stats.remainingHours;
            
            // Calculate credits (1 credit for every 30 hours)
            const credits = Math.floor(stats.totalHours / 30);
            document.getElementById('creditsEarned').innerText = credits;
            
            const activitiesResponse = await fetch(`https://clubtracker.onrender.com/students/${studentId}/activities`);
            
            if (activitiesResponse.ok) {
                const activities = await activitiesResponse.json();
                const tableBody = document.getElementById('activitiesBody');
                
                // Clear out any existing rows just in case
                tableBody.innerHTML = '';
                
                if (activities.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No activities attended yet.</td></tr>`;
                } else {
                    // Loop through the data and create a table row for each activity
                    activities.forEach(act => {
                        const displayDay = act.day ? act.day : "N/A";
                        const displayTime = act.time ? act.time : "N/A";
                        const row = `
                            <tr>
                                <td><strong>${act.title}</strong></td>
                                <td>${act.description}</td>
                                <td>${act.date} <br><small style="opacity: 0.7;">${displayDay}</small></td>
                                <td>${displayTime}</td>
                                <td>${act.hours} hrs</td>
                            </tr>
                        `;
                        tableBody.innerHTML += row; // Inject the HTML into the table
                    });
                }
            }

        } else {
            console.error('Failed to load stats');
        }
    } catch (error) {
        console.error('Error connecting to backend:', error);
    }
});

// Simple logout function
function logout() {
    localStorage.clear(); // Wipe the saved ID
    window.location.href = 'index.html'; // Send them back to login
}


// Function to switch between the Student tabs
function switchTab(tabId, buttonElement) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.student-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    buttonElement.classList.add('active');

    // If they clicked the gallery tab, fetch the events!
    if (tabId === 'tab-gallery') {
        loadMajorEvents();
    }
}

// Function to fetch and display the Major Events
async function loadMajorEvents() {
    try {
        const response = await fetch('https://clubtracker.onrender.com/events/all');
        if (response.ok) {
            const events = await response.json();
            const container = document.getElementById('eventsContainer');
            container.innerHTML = ''; // Clear out any old events

            if (events.length === 0) {
                container.innerHTML = '<p>No major events published yet.</p>';
                return;
            }

            events.forEach(event => {
                // Notice how we point the image source directly to your Spring Boot server
                const cardHtml = `
                    <div class="event-card">
                        <img src="https://clubtracker.onrender.com${event.imageUrl}" alt="${event.name}" class="event-image" onerror="this.src='http://via.placeholder.com/400x200?text=No+Image'">
                        <div class="event-details">
                            <h3>${event.name}</h3>
                            <div class="event-meta">
                                <span>📅 ${event.eventDate} (${event.eventDay})</span>
                                <span>📍 ${event.venue}</span>
                            </div>
                            
                            <div class="event-section">
                                <strong>Introduction</strong>
                                ${event.introduction}
                            </div>
                            
                            <div class="event-section">
                                <strong>Description</strong>
                                ${event.description}
                            </div>
                            
                            <div class="event-section">
                                <strong>Key Takeaways</strong>
                                ${event.takeaways}
                            </div>
                            
                            <div class="event-section">
                                <strong>Sub-Events</strong>
                                ${event.subEvents}
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        }
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}

// 5. Handle 'Create Student' Form Submission
const createForm = document.getElementById('createStudentForm');

if (createForm) { // <--- THIS SAVES THE DAY
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const studentData = {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            password: document.getElementById('studentPassword').value
        };

        try {
            const response = await fetch('https://clubtracker.onrender.com/students/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                alert('Student account created successfully!');
                createForm.reset();
                loadDropdownData(); 
            } else {
                alert('Failed to create student.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to the server.');
        }
    });
}