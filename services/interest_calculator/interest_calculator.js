document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const principalInput = document.getElementById('principal');
    const principalRange = document.getElementById('principal-range');
    const rateInput = document.getElementById('rate');
    const rateRange = document.getElementById('rate-range');
    const timeInput = document.getElementById('time');
    const timeRange = document.getElementById('time-range');
    const calculateBtn = document.getElementById('calculate');
    const chartBtns = document.querySelectorAll('.chart-btn');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    const chartCanvas = document.getElementById('chart-canvas');
    const resultTable = document.getElementById('result-table').querySelector('tbody');
    
    let currentChart = null;
    let currentChartType = 'bar';

    // Get user's locale and set up formatters
    const userLocale = navigator.language || 'en-US';
    const currencyFormatter = new Intl.NumberFormat(userLocale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const percentFormatter = new Intl.NumberFormat(userLocale, {
        style: 'decimal',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });

    // Principal amount input handling
    principalRange.addEventListener('input', function() {
        const value = parseInt(this.value);
        principalInput.value = currencyFormatter.format(value);
    });

    principalInput.addEventListener('input', function() {
        const rawValue = this.value.replace(/[^\d.]/g, '');
        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue)) {
            principalRange.value = numValue;
            this.value = currencyFormatter.format(numValue);
        }
    });

    // Interest rate input handling
    rateRange.addEventListener('input', function() {
        const value = parseFloat(this.value);
        rateInput.value = percentFormatter.format(value);
    });

    rateInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            rateRange.value = value;
        }
    });

    // Time input handling
    timeRange.addEventListener('input', function() {
        timeInput.value = this.value;
    });

    timeInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (!isNaN(value) && value >= 1 && value <= 100) {
            timeRange.value = value;
        }
    });

    // Chart type buttons handling
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chartBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentChartType = this.dataset.type;
            if (resultDiv.style.display !== 'none') {
                calculateAndDisplay();
            }
        });
    });

    // Calculate button handling
    calculateBtn.addEventListener('click', calculateAndDisplay);

    function calculateAndDisplay() {
        const principal = parseFloat(principalRange.value);
        const rate = parseFloat(rateRange.value) / 100;
        const time = parseInt(timeRange.value);

        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            alert('Please enter valid numbers');
            return;
        }

        const totalAmount = principal * Math.pow((1 + rate), time);
        const totalInterest = totalAmount - principal;

        // Update result summary
        resultContent.innerHTML = `
            <div class="row text-center">
                <div class="col-md-4">
                    <h5>Principal Amount</h5>
                    <p class="h4">${currencyFormatter.format(principal)}</p>
                </div>
                <div class="col-md-4">
                    <h5>Total Interest</h5>
                    <p class="h4">${currencyFormatter.format(totalInterest)}</p>
                </div>
                <div class="col-md-4">
                    <h5>Total Amount</h5>
                    <p class="h4">${currencyFormatter.format(totalAmount)}</p>
                </div>
            </div>
        `;

        // Prepare chart data
        const labels = [];
        const principalData = [];
        const interestData = [];
        const totalData = [];
        resultTable.innerHTML = '';

        for (let year = 1; year <= time; year++) {
            const yearAmount = principal * Math.pow((1 + rate), year);
            const yearInterest = yearAmount - principal;
            
            labels.push(`Year ${year}`);
            principalData.push(principal);
            interestData.push(yearInterest);
            totalData.push(yearAmount);

            // Update table
            const row = resultTable.insertRow();
            row.innerHTML = `
                <td>Year ${year}</td>
                <td>${currencyFormatter.format(principal)}</td>
                <td>${currencyFormatter.format(yearInterest)}</td>
                <td>${currencyFormatter.format(yearAmount)}</td>
            `;
        }

        // Create or update chart
        if (currentChart) {
            currentChart.destroy();
        }

        const chartConfig = {
            type: currentChartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Total',
                    data: totalData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       currencyFormatter.format(context.raw);
                            }
                        }
                    }
                },
                scales: currentChartType !== 'pie' && currentChartType !== 'radar' ? {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return currencyFormatter.format(value);
                            }
                        }
                    }
                } : {}
            }
        };

        currentChart = new Chart(chartCanvas, chartConfig);
        resultDiv.style.display = 'block';
        sendHeight();
    }

    // Theme handling
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(`${savedTheme}-theme`);

    window.addEventListener('message', function(event) {
        if (event.data.theme) {
            body.classList.remove('light-theme', 'dark-theme');
            body.classList.add(`${event.data.theme}-theme`);
            localStorage.setItem('theme', event.data.theme);
        }
    });

    // Send height to parent iframe
    function sendHeight() {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ height: height }, '*');
    }

    window.addEventListener('resize', sendHeight);
    sendHeight();
});