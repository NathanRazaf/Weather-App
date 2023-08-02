import util from "./util";

const domObjects = (() => {
    function updateAllWeather(cityData, weatherData, unit = "metric") {
        updateCurrentWeather(cityData, weatherData, unit);
        updateHourlyWeather(weatherData, unit);
        updateDailyWeather(weatherData, unit);
    }
    function updateCurrentWeather(cityData, weatherData, unit = "metric") {
        const tempUnit = unit === "metric" ? "°C" : "°F";
        const windSpeedUnit = unit === "metric" ? "m/s" : "mph";
        const currentDate = util.epochToDate(
            weatherData.current.dt,
            weatherData.timezone,
        );

        const townName = document.querySelector("#town-name");
        const countryName = document.querySelector("#country-name");
        const townDate = document.querySelector("#town-date");
        const currentHour = document.querySelector("#current-hour");
        const currentTemp = document.querySelector("#current-temp");
        const currentWeatherImg = document.querySelector("#current-weather-img");
        const currentWeatherText = document.querySelector("#current-weather-text");
        const currentFeelsLike = document.querySelector("#current-feels-like");
        const currentHumidity = document.querySelector("#current-humidity");
        const currentRainChance = document.querySelector("#current-rain-chance");
        const currentWindSpeed = document.querySelector("#current-wind-speed");

        townName.textContent = cityData[0].name;
        countryName.textContent = util.getCountryName(cityData[0].country);
        townDate.textContent = util.extractDate(currentDate);
        currentHour.textContent = util.getHour(currentDate);
        currentTemp.textContent = `${Math.round(
            weatherData.current.temp,
        )}${tempUnit}`;
        currentWeatherImg.src = util.getIcon(weatherData.current.weather[0].icon);
        currentWeatherText.textContent =
            weatherData.current.weather[0].description[0].toUpperCase() +
            weatherData.current.weather[0].description.slice(1);
        currentFeelsLike.textContent = `${Math.round(
            weatherData.current.feels_like,
        )}${tempUnit}`;
        currentHumidity.textContent = `${weatherData.current.humidity}%`;
        currentRainChance.textContent = `${weatherData.daily[0].pop}%`;
        currentWindSpeed.textContent = `${weatherData.current.wind_speed}${windSpeedUnit}`;
    }

    function updateDailyWeather(weatherData, unit = "metric") {
        const dailyData = weatherData.daily.slice(1);
        const tempUnit = unit === "metric" ? "°C" : "°F";

        const dailyWeatherBox = document.querySelector("#daily-weather-box");
        dailyWeatherBox.innerHTML = "";
        dailyData.forEach((dailyWeather) => {
            const dailyWeatherDiv = document.createElement("div");
            dailyWeatherDiv.classList.add("daily-weather");
            const dailyWeatherDay = document.createElement("p");
            dailyWeatherDay.classList.add("daily-weather-day");
            dailyWeatherDay.textContent = util.getDayOfWeek(
                util.epochToDate(dailyWeather.dt, weatherData.timezone),
            );
            const dailyWeatherImg = document.createElement("img");
            dailyWeatherImg.classList.add("daily-weather-img");
            dailyWeatherImg.src = util.getIcon(dailyWeather.weather[0].icon);
            const dailyWeatherTempMin = document.createElement("p");
            dailyWeatherTempMin.classList.add("daily-weather-temp-min");
            dailyWeatherTempMin.textContent = `${Math.round(
                dailyWeather.temp.min,
            )}${tempUnit}`;
            const dailyWeatherTempMax = document.createElement("p");
            dailyWeatherTempMax.classList.add("daily-weather-temp-max");
            dailyWeatherTempMax.textContent = `${Math.round(
                dailyWeather.temp.max,
            )}${tempUnit}`;

            dailyWeatherDiv.appendChild(dailyWeatherDay);
            dailyWeatherDiv.appendChild(dailyWeatherImg);
            dailyWeatherDiv.appendChild(dailyWeatherTempMax);
            dailyWeatherDiv.appendChild(dailyWeatherTempMin);
            dailyWeatherBox.appendChild(dailyWeatherDiv);
        });
    }
    function updateHourlyWeather(weatherData, unit = "metric", pageIndex = 1) {
        let hourlyData = weatherData.hourly;
        const tempUnit = unit === "metric" ? "°C" : "°F";
        switch (pageIndex) {
            case 1:
                hourlyData = hourlyData.slice(1, 9);
                break;
            case 2:
                hourlyData = hourlyData.slice(9, 17);
                break;
            case 3:
                hourlyData = hourlyData.slice(17, 25);
                break;
        }

        const hourlyWeatherBox = document.querySelector("#hourly-weather-box");
        hourlyWeatherBox.innerHTML = "";
        hourlyData.forEach((hourlyWeather) => {
            const hourlyWeatherDiv = document.createElement("div");
            hourlyWeatherDiv.classList.add("hourly-weather");
            const hourlyWeatherLeft = document.createElement("div");
            hourlyWeatherLeft.classList.add("hourly-weather-left");
            const hourlyWeatherRight = document.createElement("div");
            hourlyWeatherRight.classList.add("hourly-weather-right");

            const hourlyWeatherTime = document.createElement("p");
            hourlyWeatherTime.classList.add("hourly-weather-time");
            hourlyWeatherTime.textContent = util.getHour(
                util.epochToDate(hourlyWeather.dt, weatherData.timezone),
            );
            const hourlyWeatherImg = document.createElement("img");
            hourlyWeatherImg.classList.add("hourly-weather-img");
            hourlyWeatherImg.src = util.getIcon(hourlyWeather.weather[0].icon);
            const hourlyWeatherTemp = document.createElement("p");
            hourlyWeatherTemp.classList.add("hourly-weather-temp");
            hourlyWeatherTemp.textContent = `${Math.round(
                hourlyWeather.temp,
            )}${tempUnit}`;

            hourlyWeatherLeft.appendChild(hourlyWeatherTime);
            hourlyWeatherRight.appendChild(hourlyWeatherImg);
            hourlyWeatherRight.appendChild(hourlyWeatherTemp);
            hourlyWeatherDiv.appendChild(hourlyWeatherLeft);
            hourlyWeatherDiv.appendChild(hourlyWeatherRight);
            hourlyWeatherBox.appendChild(hourlyWeatherDiv);
        });
    }

    return { updateHourlyWeather, updateAllWeather };
})();

export default domObjects;
