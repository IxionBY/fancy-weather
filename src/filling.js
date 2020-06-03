import { WEATHER_TODAY_COUNTRY, LATITUDE, LONGITUDE, WEATHER_TODAY_DATE, FEELS_LIKE, FEELS_LIKE_TRANSLATION, WIND_TRANSLATION, HUMIDITY_TRANSLATION, FEELS_LIKE_TEMPERATURE, WEATHER_TODAY_PROP, LONGITUDE_TRANSLATION, LATITUDE_TRANSLATION,
    SEARCH_BUTTON, INPUT_SEARCH, SEARCH_TRANSLATION, PLACEHOLDER_TRANSLATION} from './constants';

export let timerId;

export function fillingGeoInfo(country, city, lat, lng, timezone, language){
    WEATHER_TODAY_COUNTRY.textContent = `${city}, ${country}`;
    LATITUDE.textContent = `${LATITUDE_TRANSLATION[language]} ${lat}`;
    LONGITUDE.textContent = `${LONGITUDE_TRANSLATION[language]} ${lng}`;
    SEARCH_BUTTON.textContent = SEARCH_TRANSLATION[language];
    INPUT_SEARCH.placeholder = PLACEHOLDER_TRANSLATION[language];
    let moment = require('moment-timezone');
    moment.locale(language);
    timerId = setInterval(function(){
        WEATHER_TODAY_DATE.textContent = moment().tz(timezone).format('dd DD MMMM  HH:mm:ss');
    }, 1000);
}

export function fillWeatherInfo(language, weatherInfo){
    FEELS_LIKE.textContent = `${FEELS_LIKE_TRANSLATION[language]} `;
    FEELS_LIKE_TEMPERATURE.textContent = Math.round(weatherInfo.current.feels_like);
    WEATHER_TODAY_PROP[2].textContent = `${WIND_TRANSLATION[language]} ${Math.round(weatherInfo.current.wind_speed)} m/s`;
    WEATHER_TODAY_PROP[3].textContent = `${HUMIDITY_TRANSLATION[language]} ${Math.round(weatherInfo.current.humidity)}%`;
}