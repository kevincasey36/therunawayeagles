/let stockChart;

function updateChart(symbol, range) {
    // Update the URL with the symbol and range
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=${IEX_TOKEN}`;

    fetch(url)
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

            stockChart = new Chart(document.getElementById('stockChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Price',
                        data: prices,
                        borderColor: 'blue'
                    }]
                },
                options: {}
            });
        });
}

document.getElementById('timeRange').addEventListener('change', (event) => {
    const range = event.target.value;
    const symbol = window.location.search.split('=')[1]; // Get symbol from URL
    updateChart(symbol, range);
});

// Initial call with default values
const symbol = window.location.search.split('=')[1]; // Get symbol from URL
updateChart(symbol, '1m');
