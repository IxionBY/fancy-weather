import {APP_WRAPPER} from './constants';

export function getLinkToImage(definitionWeather) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${definitionWeather}&client_id=MiVEYOhUTuh8HIdFsz5tRJ1HRaBuLJZgqdNTtqf28zE`;
    return fetch(url)
        .then((res) => res.json());
}

export async function setImage(definitionWeather) {
    try{
        let image = await getLinkToImage(definitionWeather);
        APP_WRAPPER.style.backgroundImage = `url('${image.urls.regular}')`;
    } catch (error) {
        console.log(error);
    }
}
