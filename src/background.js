import {APP_WRAPPER} from './constants';

export function getLinkToImage(cityName, currentSeason, timesOfDay) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${cityName}.${currentSeason}.${timesOfDay}.weather&client_id=MiVEYOhUTuh8HIdFsz5tRJ1HRaBuLJZgqdNTtqf28zE`;
    return fetch(url)
        .then((res) => res.json());
}

export async function setImage(cityName, currentSeason, timesOfDay) {
    try{
        let image = await getLinkToImage(cityName, currentSeason, timesOfDay);
        if(image.errors != undefined){
            image = await getLinkToImage("sun", "summer", "day");
            console.log('Изображения по запросу не найдено, выведено изображение по запросу: sun summer day');
        }
        console.log(`Фоновое изображение по запросу: ${cityName} ${currentSeason} ${timesOfDay}`);
        APP_WRAPPER.style.backgroundImage = `url('${image.urls.regular}')`;
    } catch (error) {
        console.log(error);
    }
}
