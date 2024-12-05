document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ded54b89a34ce3ccf5c599b3f770a74e"; // Replace with your OpenWeatherMap API key
    // const cities = ["New York", "London", "Tokyo", "Colombo", "Dubai"];
    const weatherContainer = document.querySelector(".weather_section");
    const searchInput = document.querySelector(".search_section .input_search");
    const searchButton = document.querySelector(".search_section .location_bttn");

    // Fetch weather data
    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
        return response.json();
    }

    // Render main weather section
    function renderCurrentWeather(data) {
        const { main, weather } = data;
        const temperatureEl = document.querySelector(".current_weather .temperature");
        const descriptionEl = document.querySelector(".current_weather .description");
        const iconEl = document.querySelector(".current_weather img.weather_icon");
        temperatureEl.innerHTML = `${main.temp.toFixed(1)} <span>&deg;C</span>`;
        descriptionEl.textContent = weather[0].description;
        iconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        iconEl.alt = weather[0].description;
    }

    // Render city weather cards (unchanged)
    function renderCityWeather(data, city) {
        const { main, weather, wind } = data;
        const cityWeatherHTML = `
            <div class="city_weather">
                <h3>${city}</h3>
                <p>Temperature: ${main.temp}°C</p>
                <p>Condition: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind: ${wind.speed} m/s</p>
            </div>
        `;
        weatherContainer.innerHTML += cityWeatherHTML;
    }

    // Handle search button click
    searchButton.addEventListener("click", async () => {
        const city = searchInput.value.trim();
        if (!city) {
            alert("Please enter a city name!");
            return;
        }

        try {
            const weatherData = await fetchWeather(city);
            weatherContainer.innerHTML = ""; // Clear previous content
            renderCurrentWeather(weatherData); // Render only the searched city's weather
        } catch (error) {
            console.error(error.message);
            alert(`Could not fetch weather for "${city}". Please check the city name.`);
        }
    });

    // Initial load 
    loadCurrentWeather("London"); // Display weather for London initially
});