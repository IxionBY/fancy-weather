import { setCityNameByCoordinates } from './geocodingApi';
import { getMap } from './map';
import { language, unit } from './index';

export let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

export async function success(pos) {
    let crd = pos.coords;
    setCityNameByCoordinates(crd.latitude, crd.longitude, language, unit);
    getMap(crd.latitude, crd.longitude);
};

export function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
