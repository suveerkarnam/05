
const apiKey = 'e1be3ec7eb03efd69946e3567af1a23e'; 
const weatherData = document.getElementById('weatherData');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');
const errorElement = document.getElementById('error');
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');

locationForm.addEventListener('submit', fetchWeather);

function fetchWeather(event) {
    event.preventDefault();
    const location = locationInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
    errorElement.textContent = ''; 
    weatherData.style.display = 'block';
}

function showError(message) {
    errorElement.textContent = message;
    weatherData.style.display = 'none';
}