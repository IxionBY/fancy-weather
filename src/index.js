import { setImage } from './background';
import { success, error, options } from './geolocation';
import { BACKGROUND_SWITCH_BUTTON, SEARCH_BUTTON, LANG_BUTTON, BUTTON_TO_FARENGATE, BUTTON_TO_CELSIUS, INPUT_SEARCH } from './constants';
import { weatherDescription } from './weather';
import { setCoordinatesByCityName } from './geocodingApi';
import { timerId } from './filling';

export let language = localStorage.getItem('Lang')? localStorage.getItem('Lang'): "ru" ;
export let units = localStorage.getItem('Units')? localStorage.getItem('Units'): "metric" ;
LANG_BUTTON.value = language;

BACKGROUND_SWITCH_BUTTON.addEventListener('click', () => {
    setImage(weatherDescription);
});

SEARCH_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    let cityName = INPUT_SEARCH.value;
    clearInterval(timerId);
    setCoordinatesByCityName(cityName, language);
});

LANG_BUTTON.addEventListener('click', () =>{
    let selected = LANG_BUTTON.options.selectedIndex;
    let value= LANG_BUTTON.options[selected].value;
    if (value == language) return;
    language = value;
    localStorage.setItem('Lang', language);
});

BUTTON_TO_FARENGATE.addEventListener('click', () =>{
    BUTTON_TO_FARENGATE.classList.add('active');
    BUTTON_TO_CELSIUS.classList.remove('active');
    units = "imperial";
    localStorage.setItem('Units', units);
})

BUTTON_TO_CELSIUS.addEventListener('click', () =>{
    BUTTON_TO_FARENGATE.classList.remove('active');
    BUTTON_TO_CELSIUS.classList.add('active');
    units = "metric";
    localStorage.setItem('Units', units);
})

async function startApp(){
    setImage();
    navigator.geolocation.getCurrentPosition(success, error, options);
    if(units != 'metric'){
        BUTTON_TO_FARENGATE.classList.toggle('active');
        BUTTON_TO_CELSIUS.classList.toggle('active');
    }
}

startApp();
