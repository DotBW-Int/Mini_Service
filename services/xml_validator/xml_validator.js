document.addEventListener('DOMContentLoaded', function() {
    const xmlInput = document.getElementById('xml-input');
    const validationResult = document.getElementById('validation-result');
    const validateXmlButton = document.getElementById('validate-xml');

    validateXmlButton.addEventListener('click', function() {
        const xmlContent = xmlInput.value.trim();
        if (xmlContent) {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
                const parseError = xmlDoc.getElementsByTagName('parsererror');
                if (parseError.length > 0) {
                    const errorText = parseError[0].textContent;
                    const userFriendlyError = getUserFriendlyError(errorText);
                    validationResult.value = `Invalid XML:\n${userFriendlyError}`;
                    validationResult.style.color = 'red';
                } else {
                    validationResult.value = 'XML is well-formed.';
                    validationResult.style.color = 'green';
                }
            } catch (e) {
                validationResult.value = 'Error parsing XML:\n' + e.message;
                validationResult.style.color = 'red';
            }
        } else {
            alert('Please enter XML content.');
        }
    });

    function getUserFriendlyError(errorText) {
        if (errorText.includes('Unescaped \'<\' not allowed in attributes values')) {
            return 'Unescaped \'<\' not allowed in attribute values. Please ensure all attribute values are properly quoted.';
        }
        return errorText;
    }

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