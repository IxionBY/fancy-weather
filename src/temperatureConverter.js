import {NEXT_DAY_TEMPS, WEATHER_TODAY_PROP, BUTTON_TO_CELSIUS, BUTTON_TO_FARENGATE, CURRENT_TEMP, FEELS_LIKE_TEMPERATURE} from './constants'

export function changeUnitTemp(unitFrom) {
    if(unitFrom == 'metric') {
        celsiusToFahrenheit(CURRENT_TEMP);
        celsiusToFahrenheit(FEELS_LIKE_TEMPERATURE);
        console.log(FEELS_LIKE_TEMPERATURE)
        NEXT_DAY_TEMPS.forEach(element => {
            celsiusToFahrenheit(element);
        });
    } else {
        fahrenheitToCelsius(CURRENT_TEMP);
        fahrenheitToCelsius(FEELS_LIKE_TEMPERATURE);
        console.log(FEELS_LIKE_TEMPERATURE)
        NEXT_DAY_TEMPS.forEach(element => {
            fahrenheitToCelsius(element);
        });
    }
}

function celsiusToFahrenheit(element) {
    element.textContent = Math.round((+element.textContent) * 1.8 + 32);
}

function fahrenheitToCelsius(element) {
    element.textContent = Math.round(((+element.textContent) - 32) / 1.8);
}

export function changeActiveUnit(unit) {
    changeUnitTemp(unit);
    if(unit == 'metric') {
        unit = 'imperial';
    } else {
        unit = 'metric';
    }
    localStorage.setItem('Unit', unit);
    BUTTON_TO_FARENGATE.classList.toggle('active');
    BUTTON_TO_CELSIUS.classList.toggle('active');
    return unit;
}
