import { setImage } from './background';
import { success, error, options } from './geolocation';
import { BACKGROUND_SWITCH_BUTTON, SEARCH_BUTTON, LANG_BUTTON, BUTTON_TO_FARENGATE, BUTTON_TO_CELSIUS, INPUT_SEARCH, MAP_BLOCK, WEATHER_BLOCK, PRELOADER} from './constants';
import { cityName, currentSeason, timesOfDay } from './weather';
import { setCoordinatesByCityName } from './geocodingApi';
import { timerId } from './filling';
import { changeActiveUnit } from './temperatureConverter';

export let language = localStorage.getItem('Lang')? localStorage.getItem('Lang'): "en" ;
export let unit = localStorage.getItem('Unit')? localStorage.getItem('Unit'): "metric" ;
LANG_BUTTON.value = language;

if(unit != 'metric'){
    BUTTON_TO_FARENGATE.classList.toggle('active');
    BUTTON_TO_CELSIUS.classList.toggle('active');
}

BACKGROUND_SWITCH_BUTTON.addEventListener('click', () => {
    setImage(cityName, currentSeason, timesOfDay);
});

SEARCH_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    MAP_BLOCK.classList.toggle('none');
    WEATHER_BLOCK.classList.toggle('none');
    PRELOADER.classList.toggle('none');
    let cityName = INPUT_SEARCH.value;
    clearInterval(timerId);
    setCoordinatesByCityName(cityName, language);
    if(unit == 'imperial'){
        unit = changeActiveUnit(unit);
    }
});

LANG_BUTTON.addEventListener('click', () =>{
    
    let selected = LANG_BUTTON.options.selectedIndex;
    let value= LANG_BUTTON.options[selected].value;
    if (value == language) return;
    language = value;
    let cityName = INPUT_SEARCH.value;
    console.log(cityName);
    MAP_BLOCK.classList.toggle('none');
    WEATHER_BLOCK.classList.toggle('none');
    PRELOADER.classList.toggle('none');
    if(cityName == ''){
        navigator.geolocation.getCurrentPosition(success, error, options);
    }else{
        setCoordinatesByCityName(cityName, language);
    }
    if(unit == 'imperial'){
        unit = changeActiveUnit(unit);
    }
    localStorage.setItem('Lang', language);
});

BUTTON_TO_FARENGATE.addEventListener('click', () =>{
    if(unit == 'metric') {
        unit = changeActiveUnit(unit);
    }
});

BUTTON_TO_CELSIUS.addEventListener('click', () =>{
    if(unit == 'imperial') {
        unit = changeActiveUnit(unit);
    }
});

window.onload = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
};
