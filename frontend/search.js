let supportedSymbols = [];

// Fetch the supported symbols on page load
fetch(`https://cloud.iexapis.com/stable/ref-data/symbols?token=${IEX_TOKEN}`)
    .then(response => response.json())
    .then(data => {
        supportedSymbols = data;
    });

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value;

    // Find the symbol that matches the query
    const matchingSymbol = supportedSymbols.find(symbol => symbol.symbol === query.toUpperCase());

    if (matchingSymbol) {
        window.location.href = `/chart.html?symbol=${matchingSymbol.symbol}`;
    } else {
        alert('Symbol not found');
    }
});
