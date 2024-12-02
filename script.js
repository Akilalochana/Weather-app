document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ded54b89a34ce3ccf5c599b3f770a74e"; // Replace with your OpenWeatherMap API key
    const cities = ["New York", "London", "Tokyo", "Colombo", "Dubai"];
    const weatherContainer = document.querySelector(".weather_section");

    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
        return response.json();
    }

    const temperature = document.querySelector(".temperature")


    function renderWeather(data, city) {
        const { main, weather, wind } = data;

        

        const cityWeatherHTML = 
        `
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

    async function loadWeather() {
        weatherContainer.innerHTML = ""; // Clear previous content
        for (const city of cities) {
            try {
                const weatherData = await fetchWeather(city);
                renderWeather(weatherData, city);
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    loadWeather();
});
