const weatherData = (() => {
    async function getWeatherData(city) {
        const apiRequest = `https://api.weatherapi.com/v1/forecast.json?key=c877832b46004c6e9e1224325232707&q=${city}&days=8&aqi=no&alerts=no`;
        const response = await fetch(apiRequest, { mode: "cors" });

        if (!response.ok) {
            throw new Error("Town does not exist or other error occurred");
        }

        return await response.json();
    }
    async function getHourlyForecast(city) {
        try {
            let nextHeightHours;
            const weatherData = await getWeatherData(city);
            const todayForecast = weatherData.forecast.forecastday[0].hour;
            const tomorrowForecast = weatherData.forecast.forecastday[1].hour;
            const currentLocalTime = parseInt(
                weatherData.location.localtime.split(" ")[1].slice(0, 2),
            );
            if (currentLocalTime < 16) {
                nextHeightHours = todayForecast.slice(
                    currentLocalTime + 1,
                    currentLocalTime + 9,
                );
            } else {
                const todayRemainingHours = todayForecast.slice(currentLocalTime + 1);
                const tomorrowRemainingHours = tomorrowForecast.slice(
                    0,
                    8 - todayRemainingHours.length,
                );
                nextHeightHours = todayRemainingHours.concat(tomorrowRemainingHours);
            }
            console.log(weatherData);
            console.log(currentLocalTime);
            console.log(nextHeightHours);
            return nextHeightHours;
        } catch (error) {
            const no = document.querySelector("#no");
            no.textContent = "This town does not exist!";
        }
    }

    async function getWeeklyForecast(city) {
        try {
            const weatherData = await getWeatherData(city);
            const weeklyForecast = weatherData.forecast.forecastday.slice(1);
            console.log(weeklyForecast);
        } catch (error) {
            const no = document.querySelector("#no");
            no.textContent = "This town does not exist!";
        }
    }

    return {
        getHourlyForecast,
        getWeeklyForecast,
    };
})();

export default weatherData;
