document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('json-input');
    const prettifiedResult = document.getElementById('prettified-result');
    const prettifyJsonButton = document.getElementById('prettify-json');

    prettifyJsonButton.addEventListener('click', function() {
        const jsonContent = jsonInput.value.trim();
        if (jsonContent) {
            try {
                const parsedJson = JSON.parse(jsonContent);
                const prettyJson = JSON.stringify(parsedJson, null, 4);
                prettifiedResult.value = prettyJson;
            } catch (e) {
                prettifiedResult.value = 'Invalid JSON:\n' + e.message;
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