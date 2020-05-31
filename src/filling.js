import { WEATHER_TODAY_COUNTRY, LATITUDE, LONGITUDE, WEATHER_TODAY_DATE } from './constants';

export let timerId;

export function fillingGeoInfo(country, city, lat, lng, timezone, language){
    WEATHER_TODAY_COUNTRY.textContent = `${city}, ${country}`; 
    LATITUDE.textContent = `Широта: ${lat}`;
    LONGITUDE.textContent = `Долгота: ${lng}`;
    let moment = require('moment-timezone');
    moment.locale(language);
    timerId = setInterval(function(){
        WEATHER_TODAY_DATE.textContent = moment().tz(timezone).format('dd DD MMMM  HH:mm:ss');
    }, 1000);
}
