import { WEATHER_TODAY_PROP, CURRENT_TEMP, CURRENT_WEATHER_ICON, NEXT_DAY_TEMPS, NEXT_DAY_NAME, DAYS_RU, DAYS_EN, DAYS_BE, NEXT_DAY_ICONS } from './constants';
import { language, units } from './index';
import{ setImage } from './background';

export function getWeatherNextDays(latitude, longitude, language) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly&units=metric&lang=${language}&appid=c3ca0fd166457d509488212a4623be5e`;
    return fetch(url)
        .then((res) => res.json());
}

export let weatherDescription = '';

export async function setWeather(latitude, longitude, language){
    try {
        let weatherInfo = await getWeatherNextDays(latitude, longitude, language);
        CURRENT_TEMP.textContent = `${Math.round(weatherInfo.current.temp)}°`;
        CURRENT_WEATHER_ICON.src = `http://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`;
        WEATHER_TODAY_PROP[0].textContent = weatherInfo.current.weather[0].description;
        WEATHER_TODAY_PROP[1].textContent = `Feels like: ${Math.round(weatherInfo.current.feels_like)}°`;
        WEATHER_TODAY_PROP[2].textContent = `Wind: ${Math.round(weatherInfo.current.wind_speed)} m/s`;
        WEATHER_TODAY_PROP[3].textContent = `Humidity: ${Math.round(weatherInfo.current.humidity)}%`;
        
        if(language == 'ru') {
            NEXT_DAY_NAME[0].textContent = DAYS_RU[new Date(weatherInfo.daily[1].dt* 1000).getDay()];
            NEXT_DAY_NAME[1].textContent = DAYS_RU[new Date(weatherInfo.daily[2].dt* 1000).getDay()];
            NEXT_DAY_NAME[2].textContent = DAYS_RU[new Date(weatherInfo.daily[3].dt* 1000).getDay()];
         }else if(language == 'be') {
            NEXT_DAY_NAME[0].textContent = DAYS_BE[new Date(weatherInfo.daily[1].dt* 1000).getDay()];
            NEXT_DAY_NAME[1].textContent = DAYS_BE[new Date(weatherInfo.daily[2].dt* 1000).getDay()];
            NEXT_DAY_NAME[2].textContentt = DAYS_BE[new Date(weatherInfo.daily[3].dt* 1000).getDay()];
        } else {
            NEXT_DAY_NAME[0].textContent = DAYS_EN[new Date(weatherInfo.daily[1].dt* 1000).getDay()];
            NEXT_DAY_NAME[1].textContent = DAYS_EN[new Date(weatherInfo.daily[2].dt* 1000).getDay()];
            NEXT_DAY_NAME[2].textContent = DAYS_EN[new Date(weatherInfo.daily[3].dt* 1000).getDay()];
        }

        NEXT_DAY_TEMPS[0].textContent = `${Math.round(weatherInfo.daily[1].temp.eve)}°`
        NEXT_DAY_TEMPS[1].textContent = `${Math.round(weatherInfo.daily[2].temp.eve)}°`
        NEXT_DAY_TEMPS[2].textContent = `${Math.round(weatherInfo.daily[3].temp.eve)}°`

        NEXT_DAY_ICONS[0].src = `http://openweathermap.org/img/wn/${weatherInfo.daily[1].weather[0].icon}@2x.png`
        NEXT_DAY_ICONS[1].src = `http://openweathermap.org/img/wn/${weatherInfo.daily[2].weather[0].icon}@2x.png`
        NEXT_DAY_ICONS[2].src = `http://openweathermap.org/img/wn/${weatherInfo.daily[3].weather[0].icon}@2x.png`

        setImage(weatherInfo.current.weather[0].main);
        weatherDescription = weatherInfo.current.weather[0].main;
    } catch(error) {
        console.log(error);
    }
}
