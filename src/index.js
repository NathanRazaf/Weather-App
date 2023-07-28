import './styles/main.scss';
import data from './scripts/weather-data';

const button = document.querySelector('button');
const input = document.querySelector('input');

button.addEventListener('click', () => {
    data.getHourlyForecast(input.value);
    data.getWeeklyForecast(input.value);
});

window.onload = function() {
    data.getHourlyForecast('London');
    data.getWeeklyForecast('London');

};
