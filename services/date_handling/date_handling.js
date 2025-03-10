document.addEventListener('DOMContentLoaded', function() {
    const inputDate = document.getElementById('input-date');
    const unitsInput = document.getElementById('units');
    const unitTypeSelect = document.getElementById('unit-type');
    const resultDate = document.getElementById('result-date');
    const resultExplanation = document.getElementById('result-explanation');
    const addButton = document.getElementById('add');
    const subtractButton = document.getElementById('subtract');

    addButton.addEventListener('click', function() {
        calculateDate('add');
    });

    subtractButton.addEventListener('click', function() {
        calculateDate('subtract');
    });

    function calculateDate(operation) {
        const date = new Date(inputDate.value);
        const units = parseInt(unitsInput.value, 10) || 0;
        const unitType = unitTypeSelect.value;

        if (!isNaN(date.getTime())) {
            const originalDate = new Date(date);

            if (operation === 'add') {
                adjustDate(date, units, unitType);
            } else if (operation === 'subtract') {
                adjustDate(date, -units, unitType);
            }

            const locale = navigator.language;
            resultDate.value = date.toLocaleDateString(locale);
            resultExplanation.value = `The resulting date is ${date.toLocaleDateString(locale)}:
- Day of the week: ${date.toLocaleString(locale, { weekday: 'long' })}
- Month: ${date.toLocaleString(locale, { month: 'long' })}
- Year: ${date.getFullYear()}
- Original Date: ${originalDate.toLocaleDateString(locale)}
- Operation: ${operation === 'add' ? 'Addition' : 'Subtraction'}
- Units: ${units} ${unitType}`;
            autoResizeTextarea(resultExplanation);
        } else {
            alert('Please enter a valid date.');
        }
    }

    function adjustDate(date, units, unitType) {
        switch (unitType) {
            case 'days':
                date.setDate(date.getDate() + units);
                break;
            case 'weeks':
                date.setDate(date.getDate() + (units * 7));
                break;
            case 'months':
                date.setMonth(date.getMonth() + units);
                break;
            case 'years':
                date.setFullYear(date.getFullYear() + units);
                break;
        }
    }

    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // Apply theme based on local storage
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
    }
});