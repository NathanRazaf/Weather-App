const weatherData = (() => {
    async function getDataFromCity(city) {
        const apiReq = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=3b9013e102799080a6e3bc330ba1c0cf`;
        const response = await fetch(apiReq, { mode: "cors" });
        return await response.json();
    }
    async function getWeatherData(coords, units = "metric") {
        const apiRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&units=${units}&appid=3b9013e102799080a6e3bc330ba1c0cf`;
        const response = await fetch(apiRequest, { mode: "cors" });

        if (!response.ok) {
            throw new Error("Town does not exist or other error occurred");
        }

        return await response.json();
    }
    return {
        getDataFromCity,
        getWeatherData,
    };
})();

export default weatherData;
