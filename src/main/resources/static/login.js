// Keep track of which role is currently selected
let currentRole = 'student';

function switchRole(role) {
    currentRole = role;
    
    // Update button styling
    document.getElementById('studentBtn').classList.remove('active');
    document.getElementById('adminBtn').classList.remove('active');
    document.getElementById(role + 'Btn').classList.add('active');

    // Update the submit button text to match the role
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
}

// Handle the form submission WITHOUT reloading the page
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (currentRole === 'student') {
        try {
            // 1. Send the data to the Spring Boot backend
            const response = await fetch('http://localhost:8080/students/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });

            // 2. Handle the server's response
            if (response.ok) {
                const studentData = await response.json();
                alert('Login Successful! Welcome, ' + studentData.name);
                
                // Save the student's ID in the browser so the dashboard knows who is logged in
                localStorage.setItem('loggedInStudentId', studentData.id);
                localStorage.setItem('loggedInStudentName', studentData.name);
                
                // Redirect to the dashboard (we will build this next)
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server. Is Spring Boot running?');
        }
    }
    else if (currentRole === 'admin') {
        // Hardcoded Admin Credentials
        if (email === 'admin@pict.edu' && password === 'admin123') {
            alert('Admin Login Successful!');
            
            // Save the role in the browser so the dashboard knows an admin is logged in
            localStorage.setItem('loggedInRole', 'admin');
            
            // Redirect to the admin dashboard (we will build this after the student one)
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid admin email or password.');
        }
    }
});
