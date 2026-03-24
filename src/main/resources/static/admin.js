document.addEventListener('DOMContentLoaded', () => {
    // 1. Security Check: Ensure they are logged in as admin
    if (localStorage.getItem('loggedInRole') !== 'admin') {
        alert('Unauthorized access! Admins only.');
        window.location.href = 'index.html';
        return;
    }

    // 2. Load the dropdown menus with data from the database
    loadDropdownData();
});

//https://clubtracker.onrender.com

// Fetch all students and activities from Spring Boot
async function loadDropdownData() {
    try {
        // Fetch Students
        const studentRes = await fetch('https://clubtracker.onrender.com/students/all');
        if (studentRes.ok) {
            const students = await studentRes.json();
            const studentSelect = document.getElementById('studentSelect');
            studentSelect.innerHTML = '<option value="">-- Select a Student --</option>';
            students.forEach(s => {
                studentSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.email})</option>`;
            });
        }

        // Fetch Activities
        const activityRes = await fetch('https://clubtracker.onrender.com/activities/all');
        if (activityRes.ok) {
            const activities = await activityRes.json();
            const activitySelect = document.getElementById('activitySelect');
            activitySelect.innerHTML = '<option value="">-- Select an Activity --</option>';
            activities.forEach(a => {
                activitySelect.innerHTML += `<option value="${a.id}">${a.title} (${a.hours} hrs)</option>`;
            });
        }
    } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load database records.");
    }
}

// 3. Handle 'Create Activity' Form Submission
document.getElementById('createActivityForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const activityData = {
        title: document.getElementById('title').value,
        description: document.getElementById('desc').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        day: document.getElementById('day').value,
        hours: parseInt(document.getElementById('hours').value)
    };

    try {
        const response = await fetch('https://clubtracker.onrender.com/activities/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        });

        if (response.ok) {
            alert('Activity created successfully!');
            document.getElementById('createActivityForm').reset();
            loadDropdownData(); // Refresh the dropdown so the new activity appears instantly!
        } else {
            alert('Failed to create activity.');
        }
    } catch (error) {
        console.error(error);
    }
});

// 4. Handle 'Mark Attendance' Form Submission
document.getElementById('markAttendanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById('studentSelect').value;
    const activityId = document.getElementById('activitySelect').value;

    // Based on your Spring Boot controller, this uses URL parameters (@RequestParam)
    const url = `https://clubtracker.onrender.com/attendance/mark?studentId=${studentId}&activityId=${activityId}&present=true`;

    try {
        const response = await fetch(url, { method: 'POST' });

        if (response.ok) {
            alert('Attendance marked successfully! The student\'s hours have been updated.');
            document.getElementById('markAttendanceForm').reset();
        } else {
            alert('Failed to mark attendance.');
        }
    } catch (error) {
        console.error(error);
    }
});

// Simple logout function
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// 5. Handle 'Create Student' Form Submission
document.getElementById('createStudentForm').addEventListener('submit', async (e) => {
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
            document.getElementById('createStudentForm').reset();
            loadDropdownData(); // Instantly add the new student to the attendance dropdown!
        } else {
            alert('Failed to create student. The email might already be in use.');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to connect to the server.');
    }
});

// Function to switch between admin tabs
function openTab(tabId, buttonElement) {
    // 1. Hide all tab content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // 2. Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Show the selected tab and highlight the clicked button
    document.getElementById(tabId).classList.add('active');
    buttonElement.classList.add('active');

    // 4. Update the page title
    document.getElementById('pageTitle').innerText = buttonElement.innerText.replace(' 📸', '');
}


// Handle 'Create Major Event' Form Submission
// Handle 'Create Major Event' Form Submission with File Upload
document.getElementById('createMajorEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Create a FormData object
    const formData = new FormData();
    
    // 2. Append all the text fields
    formData.append("name", document.getElementById('eventName').value);
    formData.append("eventDate", document.getElementById('eventDate').value);
    formData.append("eventDay", document.getElementById('eventDay').value);
    formData.append("venue", document.getElementById('eventVenue').value);
    formData.append("introduction", document.getElementById('eventIntro').value);
    formData.append("description", document.getElementById('eventDesc').value);
    formData.append("takeaways", document.getElementById('eventTakeaways').value);
    formData.append("subEvents", document.getElementById('eventSubEvents').value);
    
    // 3. Append the actual physical file!
    const imageFile = document.getElementById('eventImage').files[0];
    formData.append("image", imageFile);

    try {
        const response = await fetch('https://clubtracker.onrender.com/events/add', {
            method: 'POST',
            body: formData // Notice: No headers are set here! The browser handles it.
        });

        if (response.ok) {
            alert('Major Event published and photo uploaded successfully!');
            document.getElementById('createMajorEventForm').reset();
        } else {
            alert('Failed to publish the event.');
        }
    } catch (error) {
        console.error(error);
        alert('Server connection error.');
    }
});