document.addEventListener('DOMContentLoaded', function() {
    const stringifyButton = document.getElementById('stringify');
    const parseButton = document.getElementById('parse');
    const onelineButton = document.getElementById('oneline');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    const jsonInput = document.getElementById('json-input');

    stringifyButton.addEventListener('click', function() {
        try {
            const jsonObject = JSON.parse(jsonInput.value);
            resultContent.value = JSON.stringify(jsonObject, null, 4);
            resultDiv.style.display = 'block';
            sendHeight(); // Ensure height is sent after displaying the result
        } catch (e) {
            alert('Invalid JSON input');
        }
    });

    parseButton.addEventListener('click', function() {
        try {
            const jsonString = JSON.stringify(JSON.parse(jsonInput.value));
            resultContent.value = JSON.stringify(JSON.parse(jsonString), null, 4);
            resultDiv.style.display = 'block';
            sendHeight(); // Ensure height is sent after displaying the result
        } catch (e) {
            alert('Invalid JSON input');
        }
    });

    onelineButton.addEventListener('click', function() {
        try {
            const jsonObject = JSON.parse(resultContent.value);
            resultContent.value = JSON.stringify(jsonObject);
            sendHeight(); // Ensure height is sent after updating the result
        } catch (e) {
            alert('Invalid JSON input');
        }
    });

    // Apply theme based on local storage
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.add('light-theme');
    } else {
        html.classList.add('dark-theme');
    }

    // Listen for messages from parent page
    window.addEventListener('message', function(event) {
        if (event.data.theme) {
            html.classList.toggle('dark-theme', event.data.theme === 'dark');
            html.classList.toggle('light-theme', event.data.theme === 'light');
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