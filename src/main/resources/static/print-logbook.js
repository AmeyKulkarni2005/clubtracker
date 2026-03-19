document.addEventListener('DOMContentLoaded', async () => {
    const studentId = localStorage.getItem('loggedInStudentId');
    const studentName = localStorage.getItem('loggedInStudentName');

    if (!studentId) {
        alert("Please log in to view your logbook.");
        window.close();
        return;
    }

    // 1. Fill in the student's name
    document.getElementById('printName').innerHTML = `Name of the student: <span style="color: black; font-weight: normal;">${studentName}</span>`;

    try {
        // 2. Fetch data from backend
        const response = await fetch(`http://localhost:8080/students/${studentId}/activities`);
        
        if (response.ok) {
            const activities = await response.json();
            const tableBody = document.getElementById('logbookTableBody');
            
            // The official form has 8 rows. We will track how many we fill.
            let rowsFilled = 0;
            const totalRowsNeeded = 8; 

            // 3. Fill rows with actual data
            activities.forEach((act, index) => {
                const displayDay = act.day ? act.day : "";
                const displayTime = act.time ? act.time : "";

                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${act.date}</td>
                        <td>${displayDay}</td>
                        <td>${displayTime}</td>
                        <td>${act.hours}</td>
                        <td class="text-left"><strong>${act.title}</strong><br>${act.description}</td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
                rowsFilled++;
            });

            // 4. Fill the remaining rows with empty boxes to match the exact format!
            const emptyRows = totalRowsNeeded - rowsFilled;
            for (let i = 0; i < emptyRows; i++) {
                tableBody.innerHTML += `
                    <tr>
                        <td style="height: 30px;"></td> <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
            }
        }
    } catch (error) {
        console.error("Error fetching print data:", error);
    }
});