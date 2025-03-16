document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const searchBar = document.getElementById('search-bar');
    const servicesContainer = document.getElementById('services-container');
    const adBoxes = document.querySelectorAll('.ad-box');

    // Services Data
    const servicesData = {
        "services": [
            {
                "name": "Date Handling",
                "path": "../services/date_handling/date_handling.html",
                "icon": "far fa-calendar-alt"
            },
            {
                "name": "Epoch Converter",
                "path": "../services/eposh_date_converter/eposh_converter.html",
                "icon": "fas fa-clock"
            },
            {
                "name": "XML Validator",
                "path": "../services/xml_validator/xml_validator.html",
                "icon": "fas fa-code"
            },
            {
                "name": "JSON Validator",
                "path": "../services/json_validator/json_validator.html",
                "icon": "fas fa-check-circle"
            },
            {
                "name": "JSON Beautify",
                "path": "../services/json_prettier/json_prettier.html",
                "icon": "fas fa-paint-brush"
            },
            {
                "name": "JSON Viewer",
                "path": "../services/json_grid/json_grid.html",
                "icon": "fas fa-table"
            },
            {
                "name": "Date Difference",
                "path": "../services/date_difference/date_difference.html",
                "icon": "fas fa-calendar-day"
            },
            {
                "name": "JSON Stringify",
                "path": "../services/json_stringify/json_stringify.html",
                "icon": "fas fa-compress-alt"
            },
            {
                "name": "Interest Calculator",
                "path": "../services/interest_calculator/interest_calculator.html",
                "icon": "fas fa-calculator"
            }
        ]
    };

    // Theme Management
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    function applyTheme(theme) {
        html.className = `${theme}-theme`;
        localStorage.setItem('theme', theme);
    }

    // Service Management
    function createServiceCard(service) {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('col-12', 'col-md-4', 'col-lg-3', 'service-item');
        serviceItem.innerHTML = `
            <div class="service-box p-3 mb-4">
                <a href="frame/frame.html?service=${encodeURIComponent(service.path)}" 
                   class="service-link">
                    <i class="${service.icon} service-icon mb-3"></i>
                    <h3 class="service-title">${service.name}</h3>
                </a>
            </div>
        `;
        return serviceItem;
    }

    function filterServices(searchTerm) {
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const serviceName = item.querySelector('.service-title').textContent.toLowerCase();
            item.style.display = serviceName.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    function initializeServices() {
        servicesContainer.innerHTML = '';
        servicesData.services.forEach(service => {
            servicesContainer.appendChild(createServiceCard(service));
        });
    }

    // Ad Management
    function hideEmptyAdBoxes() {
        adBoxes.forEach(adBox => {
            if (!adBox.textContent.trim()) {
                adBox.style.display = 'none';
            }
        });
    }

    // Event Listeners
    themeToggle.addEventListener('change', function() {
        applyTheme(this.checked ? 'dark' : 'light');
    });

    searchBar.addEventListener('input', (e) => filterServices(e.target.value));

    // Initialize
    initializeTheme();
    initializeServices();
    hideEmptyAdBoxes();
});