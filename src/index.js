import { setImage } from './background';
import { success, error, options } from './geolocation';
import { BACKGROUND_SWITCH_BUTTON, SEARCH_BUTTON, FEELS_LIKE, BUTTON_PLAY, CURRENT_TEMP, WEATHER_TODAY_PROP, LANG_BUTTON, BUTTON_TO_FARENGATE, BUTTON_TO_CELSIUS, INPUT_SEARCH, MAP_BLOCK, WEATHER_BLOCK, PRELOADER, BUTTON_VOICE} from './constants';
import { cityName, currentSeason, timesOfDay, weatherMessage } from './weather';
import { setCoordinatesByCityName } from './geocodingApi';
import { timerId } from './filling';
import { changeActiveUnit } from './temperatureConverter';

export let language = localStorage.getItem('Lang')? localStorage.getItem('Lang'): "en" ;
export let unit = localStorage.getItem('Unit')? localStorage.getItem('Unit'): "metric" ;
LANG_BUTTON.value = language;
let recognizer = new webkitSpeechRecognition();
recognizer.interimResults = true;
recognizer.lang = language;

let synth = window.speechSynthesis;
let message = new SpeechSynthesisUtterance();
message.lang = language;
message.volume = 0.5;

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

BUTTON_PLAY.addEventListener('click', () =>{
    message.lang = language;
    message.text = `${CURRENT_TEMP.textContent}, ${WEATHER_TODAY_PROP[0].textContent}, ${FEELS_LIKE.textContent} ${WEATHER_TODAY_PROP[1].textContent}, ${WEATHER_TODAY_PROP[2].textContent}, ${WEATHER_TODAY_PROP[3].textContent}`;
    synth.speak(message);
})

BUTTON_VOICE.addEventListener('click', () =>{
    recognizer.lang = language;
    recognizer.start();
    BUTTON_VOICE.classList.toggle('active-voice');
});


recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    if (result.isFinal) {
        if(result[0].transcript == "погода" || result[0].transcript == "weather" ||  result[0].transcript == "надвор'е"){
            message.lang = language;
            message.text = `${CURRENT_TEMP.textContent}, ${WEATHER_TODAY_PROP[0].textContent}, ${FEELS_LIKE.textContent} ${WEATHER_TODAY_PROP[1].textContent}, ${WEATHER_TODAY_PROP[2].textContent}, ${WEATHER_TODAY_PROP[3].textContent}`;
            synth.speak(message);
            BUTTON_VOICE.classList.toggle('active-voice');
            console.log(`Громкость от 0 до 1: ${message.volume.toFixed(2)}`);
        }else if(result[0].transcript == "громче" || result[0].transcript == "louder" ||  result[0].transcript == "гучней"){
            message.volume = message.volume + 0.2;
            BUTTON_VOICE.classList.toggle('active-voice');
            console.log(`Громкость от 0 до 1: ${message.volume.toFixed(2)}`);
        }else if(result[0].transcript == "тише" || result[0].transcript == "quieter" ||  result[0].transcript == "цішэй"){
            message.volume = message.volume - 0.2;
            BUTTON_VOICE.classList.toggle('active-voice');
            console.log(`Громкость от 0 до 1: ${message.volume.toFixed(2)}`);
        }else{
            INPUT_SEARCH.value = result[0].transcript;
            MAP_BLOCK.classList.toggle('none');
            WEATHER_BLOCK.classList.toggle('none');
            PRELOADER.classList.toggle('none');
            let cityName = INPUT_SEARCH.value;
            clearInterval(timerId);
            setCoordinatesByCityName(cityName, language);
            if(unit == "imperial"){
                unit = ChangeActiveUnit(unit);
            }
            BUTTON_VOICE.classList.toggle('active-voice');
        }
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    } 
};

alert('Чтобы прослушать погоду скажите: "погода", "weather" или "надвор\'е", чтобы сделать звук громче скажите: "громче", "louder" или "гучней", чтобы сделать звук тише скажите "тише", "quieter" или "цішэй". Подсказки выводятся в консоль.');
window.onload = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
};
