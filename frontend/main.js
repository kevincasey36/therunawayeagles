// frontend/main.js
document.getElementById("search-button").addEventListener("click", searchStocks);

function searchStocks() {
    const query = document.getElementById("search-query").value;
    const url = "/search_stocks"; // Endpoint in our own backend

    // Show a loading indicator
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = "<p>Loading...</p>";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbols: query })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("An error occurred while fetching the data");
            }
            return response.json();
        })
        .then(data => displayResults(data))
        .catch(error => {
            console.error(error);
            resultsSection.innerHTML = "<p>An error occurred. Please try again later.</p>";
        });
}

function displayResults(data) {
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; // Clear previous results

    for (const symbol in data) {
        const quote = data[symbol].quote;
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = `<h2>${quote.companyName} (${symbol})</h2><p>Price: $${quote.latestPrice}</p>`;
        resultsSection.appendChild(resultDiv);
    }
}
