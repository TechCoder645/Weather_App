const searchButton = document.querySelector(".Search-box button");
const input = document.querySelector(".Search-box input");
const url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b90fa505abmshbc1a1fadf37b4c6p19791ajsn15ed2c519a39",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function fetchWeatherData() {
  const city = input.value;
  if (city === "") return;

  const fullUrl = `${url}?city=${city}`;

  try {
    const response = await fetch(fullUrl, options);
    const result = await response.json(); // Assuming the API returns JSON

    // Update the HTML elements with the fetched data
    document.querySelector(".temp").textContent = `${result.temp}°C`;
    document.querySelector(".description").textContent = city;
    document.querySelector(
      ".info-humidity span"
    ).textContent = `${result.humidity}%`;
    document.querySelector(
      ".info-wind_speed span"
    ).textContent = `${result.wind_speed} km/h`;

    // Change the image according to the weather
    const weatherIcon = document.querySelector(".Weather-icon");
    switch (result.weather) {
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/cloudy.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Thunderstorm":
        weatherIcon.src = "images/thunderstorm.png";
        break;
      default:
        weatherIcon.src = "images/default.png";
    }
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener("click", fetchWeatherData);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchWeatherData();
  }
});
