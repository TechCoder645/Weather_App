document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "ee473043cbcbec1edd5dc26072a743c8"; // Replace with your OpenWeatherMap API key
  const searchBox = document.querySelector(".Search-box input");
  const searchButton = document.querySelector(".Search-box button");
  const weatherIcon = document.querySelector(".Weather-icon");
  const tempElement = document.querySelector(".temp");
  const descriptionElement = document.querySelector(".description");
  const humidityElement = document.querySelector(".info-humidity span");
  const windSpeedElement = document.querySelector(".info-wind_speed span");

  searchButton.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
      fetchWeatherData(city);
    }
  });

  function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  function updateWeatherData(data) {
    if (data && data.main) {
      const { temp } = data.main;
      const { description, icon } = data.weather[0];
      const { humidity } = data.main;
      const { speed: windSpeed } = data.wind;

      tempElement.innerHTML = `${Math.round(temp)}<span> °C</span>`;
      descriptionElement.textContent = description;
      humidityElement.textContent = `${humidity}%`;
      windSpeedElement.textContent = `${Math.round(windSpeed)} km/h`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    } else {
      alert("City not found!");
    }
  }
});
