document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "f13f348aec004efd93995145240110"; // Replace with your WeatherAPI key
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
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  function updateWeatherData(data) {
    if (data && data.current) {
      const { temp_c, condition, humidity, wind_kph } = data.current;
      tempElement.innerHTML = `${Math.round(temp_c)}<span> °C</span>`;
      descriptionElement.textContent = condition.text;
      humidityElement.textContent = `${humidity}%`;
      windSpeedElement.textContent = `${Math.round(wind_kph)} km/h`;

      // Map condition code to local icon filename
      const iconMapping = {
        1000: "sunny.png", // Clear
        1003: "partly_cloudy.png", // Partly cloudy
        1006: "cloudy.png", // Cloudy
        1009: "overcast.png", // Overcast
        1030: "mist.png", // Mist
        1063: "rain_showers.png", // Patchy rain possible
        1066: "snow_showers.png", // Patchy snow possible
        1069: "sleet_showers.png", // Patchy sleet possible
        1072: "freezing_drizzle.png", // Patchy freezing drizzle possible
        1087: "thunderstorms.png", // Thundery outbreaks possible
        1114: "blowing_snow.png", // Blowing snow
        1117: "blizzard.png", // Blizzard
        1135: "fog.png", // Fog
        1147: "freezing_fog.png", // Freezing fog
        1150: "light_drizzle.png", // Patchy light drizzle
        1153: "drizzle.png", // Light drizzle
        1168: "freezing_drizzle.png", // Freezing drizzle
        1171: "heavy_freezing_drizzle.png", // Heavy freezing drizzle
        1180: "light_rain.png", // Patchy light rain
        1183: "rain.png", // Light rain
        1186: "moderate_rain.png", // Moderate rain at times
        1189: "rain.png", // Moderate rain
        1192: "heavy_rain.png", // Heavy rain at times
        1195: "heavy_rain.png", // Heavy rain
        1198: "light_freezing_rain.png", // Light freezing rain
        1201: "freezing_rain.png", // Moderate or heavy freezing rain
        1204: "light_sleet.png", // Light sleet
        1207: "sleet.png", // Moderate or heavy sleet
        1210: "light_snow.png", // Patchy light snow
        1213: "snow.png", // Light snow
        1216: "moderate_snow.png", // Patchy moderate snow
        1219: "snow.png", // Moderate snow
        1222: "heavy_snow.png", // Patchy heavy snow
        1225: "heavy_snow.png", // Heavy snow
        1237: "ice_pellets.png", // Ice pellets
        1240: "light_rain_showers.png", // Light rain showers
        1243: "rain_showers.png", // Moderate or heavy rain showers
        1246: "heavy_rain_showers.png", // Torrential rain showers
        1249: "light_sleet_showers.png", // Light sleet showers
        1252: "sleet_showers.png", // Moderate or heavy sleet showers
        1255: "light_snow_showers.png", // Light snow showers
        1258: "snow_showers.png", // Moderate or heavy snow showers
        1261: "light_ice_pellet_showers.png", // Light showers of ice pellets
        1264: "ice_pellet_showers.png", // Moderate or heavy showers of ice pellets
        1273: "light_rain_thunder.png", // Patchy light rain with thunder
        1276: "rain_thunder.png", // Moderate or heavy rain with thunder
        1279: "light_snow_thunder.png", // Patchy light snow with thunder
        1282: "snow_thunder.png", // Moderate or heavy snow with thunder
      };

      const iconFilename = iconMapping[condition.code] || "default.png"; // Fallback to default icon
      weatherIcon.src = `images/${iconFilename}`;
    } else {
      alert("City not found!");
    }
  }
});
