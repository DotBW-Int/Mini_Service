document.addEventListener('DOMContentLoaded', function() {
    const stringifyButton = document.getElementById('stringify');
    const parseButton = document.getElementById('parse');
    const onelineButton = document.getElementById('oneline');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');

    stringifyButton.addEventListener('click', function() {
        const jsonInput = document.getElementById('json-input').value.trim();
        try {
            const jsonObject = JSON.parse(jsonInput);
            let jsonString = JSON.stringify(jsonObject, null, 2);
            jsonString = jsonString.replace(/"/g, '\\"');
            jsonString = `"${jsonString}"`;
            resultContent.value = jsonString;
            resultDiv.style.display = 'block';
            onelineButton.style.display = 'inline-block';
        } catch (e) {
            alert('Invalid JSON input.');
        }
    });

    parseButton.addEventListener('click', function() {
        const jsonInput = document.getElementById('json-input').value.trim();
        try {
            let jsonString = jsonInput;
            if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
                jsonString = jsonString.slice(1, -1);
            }
            jsonString = jsonString.replace(/\\"/g, '"');
            const jsonObject = JSON.parse(jsonString);
            resultContent.value = JSON.stringify(jsonObject, null, 2);
            resultDiv.style.display = 'block';
            onelineButton.style.display = 'none';
        } catch (e) {
            alert('Invalid JSON string.');
        }
    });

    onelineButton.addEventListener('click', function() {
        const jsonString = document.getElementById('json-input').value.trim();
        try {
            const jsonObject = JSON.parse(jsonString.replace(/\\"/g, '"'));
            resultContent.value = JSON.stringify(jsonObject, null, 0);
        } catch (e) {
            alert('Error converting to one line.');
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
});