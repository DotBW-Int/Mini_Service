document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('theme-toggle');
    const body = document.body;
    const themeLabel = document.getElementById('theme-label');
    const adBoxes = document.querySelectorAll('.ad-box');
    const searchBar = document.getElementById('search-bar');
    const servicesContainer = document.getElementById('services-container');

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

    // Hide ad boxes if they are empty
    adBoxes.forEach(adBox => {
        if (!adBox.textContent.trim()) {
            adBox.style.display = 'none';
        }
    });

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

    // Populate the services container with data from the JSON variable
    servicesData.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('col-12', 'col-md-4', 'service-item');
        serviceItem.innerHTML = `
            <div class="service-box p-3 mb-4 text-center">
                <a href="frame/frame.html?service=${encodeURIComponent(service.path)}" class="text-white">
                    <h3>${service.name}</h3>
                </a>
            </div>
        `;
        servicesContainer.appendChild(serviceItem);
    });

    // Filter services based on search input
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const serviceName = item.querySelector('h3').textContent.toLowerCase();
            if (serviceName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});