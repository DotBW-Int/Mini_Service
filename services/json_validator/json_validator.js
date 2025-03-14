document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('json-input');
    const validationResult = document.getElementById('validation-result');
    const validateJsonButton = document.getElementById('validate-json');

    validateJsonButton.addEventListener('click', function() {
        const jsonContent = jsonInput.value.trim();
        if (jsonContent) {
            try {
                JSON.parse(jsonContent);
                validationResult.value = 'JSON is well-formed.';
                validationResult.style.color = 'green';
            } catch (e) {
                validationResult.value = 'Invalid JSON:\n' + e.message;
                validationResult.style.color = 'red';
            }
        } else {
            alert('Please enter JSON content.');
        }
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

    // Send height to parent page
    function sendHeight() {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ height: height }, '*');
    }

    // Send height on load and resize
    sendHeight();
    window.addEventListener('resize', sendHeight);
});