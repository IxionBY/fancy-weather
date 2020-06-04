import { getMap} from './map';
import { setWeather} from './weather';
import { INPUT_SEARCH, API_MESSAGE, MAP_BLOCK, WEATHER_BLOCK, PRELOADER } from './constants';
import { fillingGeoInfo, timerId } from './filling';

export function getCityNameByCoordinates(latitude, longitude, language) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&pretty=1&language=${language}&key=ab4a850827f44a8ba9984431d32f665f`;
    return fetch(url)
        .then((res) => res.json());
}

export function getCoordinatesByCityName(cityName, language) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&language=${language}&key=ab4a850827f44a8ba9984431d32f665f&pretty=1`;
    return fetch(url)
        .then((res) => res.json());
}

export async function setCoordinatesByCityName(cityName, language){
    try {
        INPUT_SEARCH.classList.remove('red');
        let cityNameInfo = await getCoordinatesByCityName(cityName, language);
        if(cityNameInfo.total_results == 0){
            throw newError('Данных не найдено');
        }
        let lng = cityNameInfo.results[0].annotations.DMS.lng;
        let lat = cityNameInfo.results[0].annotations.DMS.lat;
        let country = cityNameInfo.results[0].components.country;
        let timezone = cityNameInfo.results[0].annotations.timezone.name;
        let city = cityNameInfo.results[0].components.city;
        if (city == undefined){
            let type = cityNameInfo.results[0].components._type;
            city = cityNameInfo.results[0].components[type];
            if (type == "country" || city == undefined) {
                city = INPUT_SEARCH.value;
            }
        }
        getMap(cityNameInfo.results[0].geometry.lat, cityNameInfo.results[0].geometry.lng);
        clearInterval(timerId);
        fillingGeoInfo(country, city, lat, lng,  timezone, language);
        setWeather(cityNameInfo.results[0].geometry.lat, cityNameInfo.results[0].geometry.lng, timezone, language);
    } catch(error) {
        INPUT_SEARCH.value ='';
        INPUT_SEARCH.placeholder = API_MESSAGE[language];
        INPUT_SEARCH.classList.add('red');
        MAP_BLOCK.classList.toggle('none');
        WEATHER_BLOCK.classList.toggle('none');
        PRELOADER.classList.toggle('none');
        console.log(error);
    }
}

export async function setCityNameByCoordinates(latitude, longitude, language, unit){
    try {
        let locationByCoordinates = await getCityNameByCoordinates(latitude, longitude, language);
        let country = locationByCoordinates.results[0].components.country;
        let city = locationByCoordinates.results[0].components.city;
        let lat = locationByCoordinates.results[0].annotations.DMS.lat;
        let lng = locationByCoordinates.results[0].annotations.DMS.lng;
        let timezone = locationByCoordinates.results[0].annotations.timezone.name;
        fillingGeoInfo(country, city, lat, lng,  timezone, language);
        setWeather(latitude, longitude, timezone, language, unit);
    } catch(error) {
        console.log(error);
    }
}
