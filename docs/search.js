function handleSearch() {
    const query = document.getElementById('search').value;
    searchStocks(query);
}

function searchStocks(query) {
    // If the query is empty, hide the autocomplete suggestions
    if (query === '') {
        document.getElementById('autocomplete').innerHTML = '';
        return;
    }

    // Construct the API URL for your Flask backend
    const url = `/search/${query}`;

    // Fetch the data from the API
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Create the HTML for the suggestions based on the returned data
            let html = '<ul>';
            data.forEach(stock => {
                html += `<li>${stock.symbol} - ${stock.name}</li>`;
            });
            html += '</ul>';

            // Insert the suggestions into the autocomplete div
            document.getElementById('autocomplete').innerHTML = html;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
