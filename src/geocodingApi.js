import { getMap} from './map';
import { setWeather} from './weather';
import { LONGITUDE, LATITUDE } from './constants';
import { fillingGeoInfo } from './filling';

export function getCityNameByCoordinates(latitude, longitude, language) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&pretty=1&language=${language}&key=ab4a850827f44a8ba9984431d32f665f`;
    console.log(longitude, latitude);
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
        let cityNameInfo = await getCoordinatesByCityName(cityName, language);

        setTimeout(function(){
            getMap(cityNameInfo.results[0].geometry.lat, cityNameInfo.results[0].geometry.lng);
        }, 800);
        setWeather(cityNameInfo.results[0].geometry.lat, cityNameInfo.results[0].geometry.lng, language);

        let lng = cityNameInfo.results[0].annotations.DMS.lng;
        let lat = cityNameInfo.results[0].annotations.DMS.lat;
        let country = cityNameInfo.results[0].components.country;
        let city = cityNameInfo.results[0].components.city;
        let timezone = cityNameInfo.results[0].annotations.timezone.name;

        fillingGeoInfo(country, city, lat, lng,  timezone, language);

    } catch(error) {
        console.log(error);
    }
}

export async function setCityNameByCoordinates(latitude, longitude, language){
    try {
        let locationByCoordinates = await getCityNameByCoordinates(latitude, longitude, language);
        
        let country = locationByCoordinates.results[0].components.country;
        let city = locationByCoordinates.results[0].components.city;
        let lat = locationByCoordinates.results[0].annotations.DMS.lat;
        let lng = locationByCoordinates.results[0].annotations.DMS.lng;
        let timezone = locationByCoordinates.results[0].annotations.timezone.name;
        fillingGeoInfo(country, city, lat, lng,  timezone, language);

        setWeather(latitude, longitude, language);

    } catch(error) {
        console.log(error);
    }
}