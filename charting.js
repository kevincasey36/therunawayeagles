// Get the canvas element
const ctx = document.getElementById('stockChart').getContext('2d');

// Initialize the chart variable
let stockChart;

// Extract symbol from URL
const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

// Function to fetch company information and call displayCompanyInfo
function fetchCompanyInfo(symbol) {
    fetch(`/company/${symbol}`)
        .then(response => response.json())
        .then(data => {
            displayCompanyInfo(data);
        });
}

// Function to fetch data and update the chart
function updateChart(symbol, range) {
    fetch(`/historical/${symbol}?range=${range}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.close);

            if (stockChart) {
                stockChart.data.labels = labels;
                stockChart.data.datasets[0].data = prices;
                stockChart.update();
                return;
            }

            stockChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Price',
                        data: prices,
                        borderColor: 'blue'
                    }]
                },
                options: {
                    // Additional options
                }
            });
        });
}

// Add an event listener to update the chart when the time range changes
document.getElementById('timeRange').addEventListener('change', (event) => {
    const range = event.target.value;
    updateChart(symbol, range);
});

// Initial calls
fetchCompanyInfo(symbol);
updateChart(symbol, '1m');
