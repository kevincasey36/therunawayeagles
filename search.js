document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value;

    // Assuming you have an endpoint in your backend to search symbols
    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            // Do something with the search results, like redirecting to the charting page
            window.location.href = `/chart?symbol=${data.symbol}`;
        });
});
