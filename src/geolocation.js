import { setCityNameByCoordinates } from './geocodingApi';
import { getMap } from './map';
import { language} from './index';

export let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

export async function success(pos) {
    var crd = pos.coords;
    setCityNameByCoordinates(crd.latitude, crd.longitude, language);
    setTimeout(function(){
        getMap(crd.latitude, crd.longitude);
    }, 800);
};

export function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
