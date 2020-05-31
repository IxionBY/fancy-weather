export function getMap(latitude, longitude){
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXhpb25ieSIsImEiOiJja2FvOTBib3kwYnR6MnFwbzhpM3ltYmI1In0.4La50Kp_kZgREP1_FjXvaA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 8
    });
    var marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
}
