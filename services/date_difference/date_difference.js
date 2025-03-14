document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const daysP = document.getElementById('days');
    const weeksP = document.getElementById('weeks');
    const yearsP = document.getElementById('years');
    const hoursP = document.getElementById('hours');
    const minutesP = document.getElementById('minutes');
    const secondsP = document.getElementById('seconds');
    const millisecondsP = document.getElementById('milliseconds');
    const startDayP = document.getElementById('start-day');
    const endDayP = document.getElementById('end-day');

    calculateButton.addEventListener('click', function() {
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);

        if (isNaN(startDate) || isNaN(endDate)) {
            alert('Please enter valid dates.');
            return;
        }

        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.ceil(diffDays / 7);
        const diffYears = Math.abs(endDate.getFullYear() - startDate.getFullYear());
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.ceil(diffTime / (1000 * 60));
        const diffSeconds = Math.ceil(diffTime / 1000);
        const diffMilliseconds = diffTime;

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const startDay = daysOfWeek[startDate.getDay()];
        const endDay = daysOfWeek[endDate.getDay()];

        daysP.textContent = `Difference in Days: ${diffDays}`;
        weeksP.textContent = `Difference in Weeks: ${diffWeeks}`;
        yearsP.textContent = `Difference in Years: ${diffYears}`;
        hoursP.textContent = `Difference in Hours: ${diffHours}`;
        minutesP.textContent = `Difference in Minutes: ${diffMinutes}`;
        secondsP.textContent = `Difference in Seconds: ${diffSeconds}`;
        millisecondsP.textContent = `Difference in Milliseconds: ${diffMilliseconds}`;
        startDayP.textContent = `Start Date is a: ${startDay}`;
        endDayP.textContent = `End Date is a: ${endDay}`;

        resultDiv.style.display = 'block';
    });

    // Apply theme based on local storage
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
    }

    // Listen for messages from parent page
    window.addEventListener('message', function(event) {
        if (event.data.theme) {
            body.classList.toggle('dark-theme', event.data.theme === 'dark');
            body.classList.toggle('light-theme', event.data.theme === 'light');
            localStorage.setItem('theme', event.data.theme);
        }
    });
});