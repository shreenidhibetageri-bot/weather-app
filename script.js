async function getWeather() {

    const city = document.getElementById("cityInput").value;
    const apiKey = "d80e23a2179ff7d42c10535496819a16";

    if (!city) {
        alert("Enter city name");
        return;
    }

    try {

        // Current Weather
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const currentRes = await fetch(currentURL);
        const currentData = await currentRes.json();

        if (currentRes.status !== 200) {
            alert(currentData.message);
            return;
        }

        document.getElementById("cityName").innerText = currentData.name;
        document.getElementById("temperature").innerText = currentData.main.temp + " °C";
        document.getElementById("condition").innerText = currentData.weather[0].description;
        document.getElementById("humidity").innerText = "💧 " + currentData.main.humidity + "%";
        document.getElementById("wind").innerText = "🌬 " + currentData.wind.speed + " m/s";

        const iconCode = currentData.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // 5 Day Forecast
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const forecastRes = await fetch(forecastURL);
        const forecastData = await forecastRes.json();

        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = "";

        for (let i = 0; i < forecastData.list.length; i += 8) {

            const day = forecastData.list[i];
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p>${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                    <p>${Math.round(day.main.temp)}°C</p>
                </div>
            `;
        }

    } catch (error) {
        alert("Something went wrong!");
        console.log(error);
    }
}
