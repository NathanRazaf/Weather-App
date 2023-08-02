import data from "./weather-data";
import domObjects from "./domObjects";
import util from "./util";

const dom = (() => {
    let weatherData;
    let weatherDataCelsius;
    let weatherDataFahrenheit;
    let cityData;
    let unit = "metric";
    async function putEventListeners() {
        const hourPageNumber = document.querySelector("#hour-page-number");
        const button = document.querySelector("#search-btn");
        const input = document.querySelector("#search-input");
        const hourPageLeft = document.querySelector("#hour-page-left");
        const hourPageRight = document.querySelector("#hour-page-right");
        const celsiusBtn = document.querySelector("#celsius");
        const fahrenheitBtn = document.querySelector("#fahrenheit");

        hourPageLeft.addEventListener("click", () => {
            if (parseInt(hourPageNumber.textContent) > 1) {
                hourPageNumber.textContent = parseInt(hourPageNumber.textContent) - 1;
                domObjects.updateHourlyWeather(
                    unit === "metric" ? weatherDataCelsius : weatherDataFahrenheit,
                    unit,
                    parseInt(hourPageNumber.textContent),
                );
            }
        });

        hourPageRight.addEventListener("click", () => {
            if (parseInt(hourPageNumber.textContent) < 3) {
                hourPageNumber.textContent = parseInt(hourPageNumber.textContent) + 1;
                domObjects.updateHourlyWeather(
                    unit === "metric" ? weatherDataCelsius : weatherDataFahrenheit,
                    unit,
                    parseInt(hourPageNumber.textContent),
                );
            }
        });

        celsiusBtn.addEventListener("click", () => {
            celsiusBtn.classList.add("active");
            fahrenheitBtn.classList.remove("active");
            unit = "metric";
            domObjects.updateAllWeather(cityData, weatherDataCelsius, unit);
        });

        fahrenheitBtn.addEventListener("click", () => {
            fahrenheitBtn.classList.add("active");
            celsiusBtn.classList.remove("active");
            unit = "imperial";
            domObjects.updateAllWeather(cityData, weatherDataFahrenheit, unit);
        });

        button.addEventListener("click", async () => {
            try {
                const inputValue = input.value
                    .replace(/(\s+$|^\s+)/g, "")
                    .replace(/(,\s+)/g, ",")
                    .replace(/(\s+,)/g, ",")
                    .replace(/\s+/g, "+");

                const cityData = await data.getDataFromCity(inputValue);
                weatherData = await data.getWeatherData(
                    util.extractCoordinates(cityData),
                );

                domObjects.updateAllWeather(cityData, weatherDataCelsius, "metric");
            } catch (error) {
                const searchError = document.querySelector("#search-error");
                searchError.classList.remove("hidden");
                setTimeout(() => {
                    searchError.classList.add("hidden");
                }, 3000);
            }
        });
    }
    async function initialize() {
        cityData = await data.getDataFromCity("Montreal");
        console.log(cityData);
        weatherDataCelsius = await data.getWeatherData(
            util.extractCoordinates(cityData),
            "metric",
        );
        console.log(weatherDataCelsius);
        weatherDataFahrenheit = await data.getWeatherData(
            util.extractCoordinates(cityData),
            "imperial",
        );
        console.log(weatherDataFahrenheit);
        domObjects.updateAllWeather(cityData, weatherDataCelsius, "metric");
        await putEventListeners();
    }

    return {
        initialize,
    };
})();

export default dom;
