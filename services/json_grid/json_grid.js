document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('json-input');
    const jsonViewer = document.getElementById('json-viewer');
    const jsonTable = document.getElementById('json-table');
    const jsonTableContent = document.getElementById('json-table-content');
    const viewTreeButton = document.getElementById('view-tree');
    const viewTableButton = document.getElementById('view-table');
    const expandScreenButton = document.getElementById('expand-screen');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenJsonViewer = document.getElementById('fullscreen-json-viewer');
    const fullscreenJsonTable = document.getElementById('fullscreen-json-table');
    const fullscreenJsonTableContent = document.getElementById('fullscreen-json-table-content');
    const closeModalButton = document.querySelector('.close');

    function createTreeView(json, container) {
        container.innerHTML = '';
        const ul = document.createElement('ul');
        container.appendChild(ul);
        function createTreeNode(key, value, parent) {
            const li = document.createElement('li');
            if (typeof value === 'object' && value !== null) {
                const span = document.createElement('span');
                span.innerHTML = `<i class="fas fa-plus-square"></i> ${key}:`;
                span.style.cursor = 'pointer';
                span.addEventListener('click', function() {
                    const icon = span.querySelector('i');
                    const childUl = li.querySelector('ul');
                    if (childUl.style.display === 'none') {
                        childUl.style.display = 'block';
                        icon.classList.remove('fa-plus-square');
                        icon.classList.add('fa-minus-square');
                    } else {
                        childUl.style.display = 'none';
                        icon.classList.remove('fa-minus-square');
                        icon.classList.add('fa-plus-square');
                    }
                });
                li.appendChild(span);
                const ul = document.createElement('ul');
                ul.style.display = 'none';
                li.appendChild(ul);
                for (const k in value) {
                    createTreeNode(k, value[k], ul);
                }
            } else {
                li.textContent = `${key}: ${value}`;
            }
            parent.appendChild(li);
        }
        for (const key in json) {
            createTreeNode(key, json[key], ul);
        }
    }

    function createTableView(json, table) {
        table.innerHTML = '';
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        const keys = Object.keys(json[0]);
        const tr = document.createElement('tr');
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        json.forEach(row => {
            const tr = document.createElement('tr');
            keys.forEach(key => {
                const td = document.createElement('td');
                if (typeof row[key] === 'object' && row[key] !== null) {
                    const span = document.createElement('span');
                    span.innerHTML = `<i class="fas fa-plus-square"></i> ${key}`;
                    span.style.cursor = 'pointer';
                    span.addEventListener('click', function() {
                        const icon = span.querySelector('i');
                        const childTable = td.querySelector('table');
                        if (childTable.style.display === 'none') {
                            childTable.style.display = 'table';
                            icon.classList.remove('fa-plus-square');
                            icon.classList.add('fa-minus-square');
                        } else {
                            childTable.style.display = 'none';
                            icon.classList.remove('fa-minus-square');
                            icon.classList.add('fa-plus-square');
                        }
                    });
                    td.appendChild(span);
                    const childTable = document.createElement('table');
                    childTable.style.display = 'none';
                    childTable.classList.add('table', 'table-bordered');
                    createTableView([row[key]], childTable);
                    td.appendChild(childTable);
                } else {
                    td.textContent = row[key];
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function createHorizontalTableView(json, table) {
        table.innerHTML = '';
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        const keys = Object.keys(json);
        const tr = document.createElement('tr');
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        const trBody = document.createElement('tr');
        keys.forEach(key => {
            const td = document.createElement('td');
            if (typeof json[key] === 'object' && json[key] !== null) {
                const span = document.createElement('span');
                span.innerHTML = `<i class="fas fa-plus-square"></i> ${key}`;
                span.style.cursor = 'pointer';
                span.addEventListener('click', function() {
                    const icon = span.querySelector('i');
                    const childTable = td.querySelector('table');
                    if (childTable.style.display === 'none') {
                        childTable.style.display = 'table';
                        icon.classList.remove('fa-plus-square');
                        icon.classList.add('fa-minus-square');
                    } else {
                        childTable.style.display = 'none';
                        icon.classList.remove('fa-minus-square');
                        icon.classList.add('fa-plus-square');
                    }
                });
                td.appendChild(span);
                const childTable = document.createElement('table');
                childTable.style.display = 'none';
                childTable.classList.add('table', 'table-bordered');
                createTableView([json[key]], childTable);
                td.appendChild(childTable);
            } else {
                td.textContent = json[key];
            }
            trBody.appendChild(td);
        });
        tbody.appendChild(trBody);
    }

    viewTreeButton.addEventListener('click', function() {
        const jsonContent = jsonInput.value.trim();
        if (jsonContent) {
            try {
                const parsedJson = JSON.parse(jsonContent);
                jsonViewer.style.display = 'block';
                jsonTable.style.display = 'none';
                createTreeView(parsedJson, jsonViewer);
            } catch (e) {
                alert('Invalid JSON:\n' + e.message);
            }
        } else {
            alert('Please enter JSON content.');
        }
    });

    viewTableButton.addEventListener('click', function() {
        const jsonContent = jsonInput.value.trim();
        if (jsonContent) {
            try {
                const parsedJson = JSON.parse(jsonContent);
                if (Array.isArray(parsedJson)) {
                    jsonViewer.style.display = 'none';
                    jsonTable.style.display = 'block';
                    createTableView(parsedJson, jsonTableContent);
                } else {
                    jsonViewer.style.display = 'none';
                    jsonTable.style.display = 'block';
                    createHorizontalTableView(parsedJson, jsonTableContent);
                }
            } catch (e) {
                alert('Invalid JSON:\n' + e.message);
            }
        } else {
            alert('Please enter JSON content.');
        }
    });

    expandScreenButton.addEventListener('click', function() {
        const jsonContent = jsonInput.value.trim();
        if (jsonContent) {
            try {
                const parsedJson = JSON.parse(jsonContent);
                fullscreenJsonViewer.innerHTML = '';
                fullscreenJsonTableContent.innerHTML = '';
                if (jsonViewer.style.display === 'block') {
                    fullscreenJsonViewer.style.display = 'block';
                    fullscreenJsonTable.style.display = 'none';
                    createTreeView(parsedJson, fullscreenJsonViewer);
                } else if (jsonTable.style.display === 'block') {
                    fullscreenJsonViewer.style.display = 'none';
                    fullscreenJsonTable.style.display = 'block';
                    if (Array.isArray(parsedJson)) {
                        createTableView(parsedJson, fullscreenJsonTableContent);
                    } else {
                        createHorizontalTableView(parsedJson, fullscreenJsonTableContent);
                    }
                }
                fullscreenModal.style.display = 'block';
                applyThemeToModal();
            } catch (e) {
                alert('Invalid JSON:\n' + e.message);
            }
        } else {
            alert('Please enter JSON content.');
        }
    });

    closeModalButton.addEventListener('click', function() {
        fullscreenModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === fullscreenModal) {
            fullscreenModal.style.display = 'none';
        }
    });

    function applyThemeToModal() {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            fullscreenModal.classList.add('dark-theme');
            fullscreenModal.classList.remove('light-theme');
        } else {
            fullscreenModal.classList.add('light-theme');
            fullscreenModal.classList.remove('dark-theme');
        }
    }

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