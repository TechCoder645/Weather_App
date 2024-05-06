// Select the form and city select element
const form = document.getElementById('query-form');
const citySelect = document.getElementById('city-slected');

// Add event listener to form to handle city selection
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = citySelect.value;
    getWeatherData(city);
});

// Function to fetch weather data from an API
const getWeatherData = (city) => {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error:', error));
}

// Function to display weather data in the HTML
const displayWeatherData = (data) => {
    const resultsDiv = document.getElementById('results');
    // Clear previous results
    resultsDiv.innerHTML = '';
    // Display new results
    resultsDiv.innerHTML = `
        <p>Weather for ${data.location.name}: ${data.current.condition.text}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
    `;
}