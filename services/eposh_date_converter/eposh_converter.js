document.addEventListener('DOMContentLoaded', function() {
    const millisecondsInput = document.getElementById('milliseconds');
    const resultDate = document.getElementById('result-date');
    const convertToDateButton = document.getElementById('convert-to-date');
    const inputDate = document.getElementById('input-date');
    const resultMilliseconds = document.getElementById('result-milliseconds');
    const convertToMillisecondsButton = document.getElementById('convert-to-milliseconds');

    convertToDateButton.addEventListener('click', function() {
        const milliseconds = parseInt(millisecondsInput.value, 10);
        if (!isNaN(milliseconds)) {
            const date = new Date(milliseconds);
            resultDate.value = formatDate(date);
        } else {
            alert('Please enter a valid number of milliseconds.');
        }
    });

    convertToMillisecondsButton.addEventListener('click', function() {
        const date = new Date(inputDate.value);
        if (!isNaN(date.getTime())) {
            resultMilliseconds.value = date.getTime();
        } else {
            alert('Please enter a valid date and time.');
        }
    });

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // Apply theme based on local storage
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
    }
});