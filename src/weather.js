import { WEATHER_TODAY_PROP, CURRENT_TEMP, CURRENT_WEATHER_ICON, NEXT_DAY_TEMPS, NEXT_DAY_NAME, DAYS_RU, DAYS_EN, DAYS_BE, NEXT_DAY_ICONS, INPUT_SEARCH} from './constants';
import { setImage } from './background';
import { changeUnitTemp } from './temperatureConverter'
import { toDetermineDayPeriod, toDetermineSeason } from './optionalFunctions'
import { fillWeatherInfo } from './filling'

function getWeather(latitude, longitude, language) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly&units=metric&lang=${language}&appid=c3ca0fd166457d509488212a4623be5e`;
    return fetch(url)
        .then((res) => res.json());
}

export let cityName = '';
export let currentSeason;
export let timesOfDay;


export async function setWeather(latitude, longitude, timezone, language, unit){
    try {
        let weatherInfo = await getWeather(latitude, longitude, language);
        CURRENT_TEMP.textContent = `${Math.round(weatherInfo.current.temp)}`;
        CURRENT_WEATHER_ICON.src = `http://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`;
        WEATHER_TODAY_PROP[0].textContent = weatherInfo.current.weather[0].description;

        if (language == 'en') {
            fillWeatherInfo(language, weatherInfo);
        } else if(language == 'ru') {
            fillWeatherInfo(language, weatherInfo);
        } else {
            fillWeatherInfo(language, weatherInfo);
        }

        NEXT_DAY_NAME.forEach((element, i) => {
            if(language == 'ru'){
                element.textContent = DAYS_RU[new Date(weatherInfo.daily[i+1].dt * 1000).getDay()];
            } else if(language == 'be') {
                element.textContent = DAYS_BE[new Date(weatherInfo.daily[i+1].dt * 1000).getDay()];
            } else {
                element.textContent = DAYS_EN[new Date(weatherInfo.daily[i+1].dt * 1000).getDay()];
            }
        });

        NEXT_DAY_TEMPS.forEach((element, i) => {
            element.textContent = Math.round(weatherInfo.daily[i+1].temp.eve);
        });

        NEXT_DAY_ICONS.forEach((element, i) => {
            element.src = `http://openweathermap.org/img/wn/${weatherInfo.daily[i+1].weather[0].icon}@2x.png`;
        });

        cityName = INPUT_SEARCH.value;

        if(unit == 'imperial'){
            changeUnitTemp('metric');
        }

        let moment = require('moment-timezone');
        moment.locale(language);
        let  hourAtNow = +moment().tz(timezone).format('HH');
        let  mounthAtNow = +moment().tz(timezone).format('MM');

        currentSeason = toDetermineSeason(mounthAtNow);
        timesOfDay = toDetermineDayPeriod(hourAtNow);

        setImage(cityName, currentSeason, timesOfDay);
        
    } catch(error) {
        console.log(error);
    }
}


