import data from "./weather-data";
import domObjects from "./domObjects";
import dom from "./dom";

import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const util = (() => {
    const countryList = require("country-list");
    function epochToDate(epoch, timezone) {
        const date = utcToZonedTime(epoch * 1000, timezone);
        return format(date, "EEEE, MMMM do yyyy, h:mm:ss a");
    }

    function getCountryName(code) {
        return countryList.getName(code);
    }
    function getDayOfWeek(date) {
        return date.split(",")[0];
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item) => {
            images[item.replace("./", "")] = r(item);
        });
        return images;
    }

    function extractCoordinates(data) {
        return { lat: data[0].lat, lon: data[0].lon };
    }

    function extractDate(date) {
        return getDayOfWeek(date) + ", " + date.split(",")[1].trim();
    }

    function getHour(date) {
        const timePart = date.split(",")[2].trim(); // Extracts "12:30:00 PM"
        const [hour, minute] = timePart.split(":");
        const amPm = timePart.split(" ")[1];
        return `${hour}:${minute} ${amPm}`;
    }

    function getIcon(code) {
        const weatherIcons = importAll(
            require.context("../assets/", false, /\.png$/),
        );
        switch (code) {
            case "01d":
                return weatherIcons["clear-day.png"];
            case "01n":
                return weatherIcons["clear-night.png"];
            case "02d":
                return weatherIcons["partly-cloudy-day.png"];
            case "02n":
                return weatherIcons["partly-cloudy-night.png"];
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return weatherIcons["cloudy.png"];
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return weatherIcons["rain.png"];
            case "11d":
            case "11n":
                return weatherIcons["storm.png"];
            case "13d":
            case "13n":
                return weatherIcons["snowflake.png"];
            case "50d":
            case "50n":
                return weatherIcons["mist.png"];
        }
    }

    return {
        getIcon,
        epochToDate,
        getDayOfWeek,
        getCountryName,
        getHour,
        extractDate,
        extractCoordinates,
    };
})();

export default util;
