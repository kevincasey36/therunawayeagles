function displayCompanyInfo(data) {
    const table = document.querySelector('#company-info table');
    table.innerHTML = `
        <tr><td>Name</td><td>${data.companyName}</td></tr>
        <tr><td>Name</td><td>${data.symbol}</td></tr>
        <tr><td>Name</td><td>${data.description}</td></tr>
        <tr><td>Industry</td><td>${data.industry}</td></tr>
        <tr><td>Website</td><td>${data.website}</td></tr>
        <tr><td>Name</td><td>${data.exchange}</td></tr>
        <!-- Add other fields as needed -->
    `;
}
