document.addEventListener('DOMContentLoaded', function() {
    const servicesList = document.getElementById('services-list');
    const serviceFrame = document.getElementById('service-frame');
    const toggleSwitch = document.getElementById('theme-toggle');
    const body = document.body;
    const themeLabel = document.getElementById('theme-label');
    const searchBar = document.getElementById('search-bar');
    const urlParams = new URLSearchParams(window.location.search);
    const servicePath = urlParams.get('service');

    // JSON data stored in a variable
    const servicesData = {
        "services": [
            {
                "name": "Date Handling",
                "path": "../services/date_handling/date_handling.html"
            },
            {
                "name": "Epoch Converter",
                "path": "../services/eposh_date_converter/eposh_converter.html"
            },
            {
                "name": "XML Validator",
                "path": "../services/xml_validator/xml_validator.html"
            },
            {
                "name": "JSON Validator",
                "path": "../services/json_validator/json_validator.html"
            }
        ]
    };

    // Populate the services list with data from the JSON variable
    servicesData.services.forEach(service => {
        const serviceItem = document.createElement('a');
        serviceItem.classList.add('list-group-item', 'list-group-item-action', 'service-item');
        serviceItem.href = `frame.html?service=${encodeURIComponent(service.path)}`;
        serviceItem.textContent = service.name;
        servicesList.appendChild(serviceItem);
    });

    // Set the iframe source to the selected service
    if (servicePath) {
        serviceFrame.src = servicePath;
        serviceFrame.onload = function() {
            adjustIframeHeight();
        };
    }

    // Check the initial state of the toggle switch and set the theme accordingly
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        toggleSwitch.checked = true;
        themeLabel.textContent = 'Day Mode';
    } else {
        body.classList.add('dark-theme');
        toggleSwitch.checked = false;
        themeLabel.textContent = 'Night Mode';
    }

    toggleSwitch.addEventListener('change', function() {
        if (toggleSwitch.checked) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeLabel.textContent = 'Day Mode';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeLabel.textContent = 'Night Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Filter services based on search input
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const serviceName = item.textContent.toLowerCase();
            if (serviceName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Adjust iframe height to match the content height
    function adjustIframeHeight() {
        const iframeDocument = serviceFrame.contentDocument || serviceFrame.contentWindow.document;
        serviceFrame.style.height = iframeDocument.body.scrollHeight + 'px';
    }
});