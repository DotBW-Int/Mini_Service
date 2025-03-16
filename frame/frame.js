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
            },
            {
                "name": "JSON Beatify",
                "path": "../services/json_prettier/json_prettier.html"
            },
            {
                "name": "JSON Viewer",
                "path": "../services/json_grid/json_grid.html"
            },
            {
                "name": "Date Difference",
                "path": "../services/date_difference/date_difference.html"
            },
            {
                "name": "Json Stringify",
                "path": "../services/json_stringify/json_stringify.html"
            },
            {
                "name": "Interest Calculator",
                "path": "../services/interest_calculator/interest_calculator.html"
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
        themeLabel.textContent = '';
    } else {
        body.classList.add('dark-theme');
        toggleSwitch.checked = false;
        themeLabel.textContent = '';
    }

    toggleSwitch.addEventListener('change', function() {
        if (toggleSwitch.checked) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeLabel.textContent = '';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeLabel.textContent = '';
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


document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const iframe = document.getElementById('service-frame');

    themeToggle.addEventListener('change', function() {
        const theme = themeToggle.checked ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme', theme === 'dark');
        document.body.classList.toggle('light-theme', theme === 'light');
        localStorage.setItem('theme', theme);

        // Send message to iframe
        iframe.contentWindow.postMessage({ theme: theme }, '*');
    });

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = false;
    } else {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

            // Listen for messages from iframe
            window.addEventListener('message', function(event) {
                if (event.data.height) {
                    iframe.style.height = event.data.height + 'px';
                }
            });
});