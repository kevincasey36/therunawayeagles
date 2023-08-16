const IEX_TOKEN = 'YOUR_API_TOKEN';

function searchStocks(query) {
  // If the query is empty, hide the autocomplete suggestions
  if (query === '') {
    document.getElementById('autocomplete').innerHTML = '';
    return;
  }

  // Construct the API URL with the query and token
  const url = `https://cloud.iexapis.com/stable/ref-data/symbols?token=${IEX_TOKEN}`;

  // Fetch the data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Filter the data based on the query and create a list of suggestions
      let suggestions = data.filter(stock => stock.symbol.startsWith(query.toUpperCase()));
      
      // Limit the number of suggestions if needed
      suggestions = suggestions.slice(0, 10);

      // Create the HTML for the suggestions
      let html = '<ul>';
      suggestions.forEach(stock => {
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
