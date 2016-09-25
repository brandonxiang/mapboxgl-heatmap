var mapboxgl_heatmap = require('./index.js');
var heatmap;

// function msgRec(msg) {
//     var latlng = new mapboxgl.LatLng(msg.lat, msg.lng);
//     var point = map.project(latlng);
//     heatmap.addPoint(point.x, point.y, 25, 0.5);
// }

mapboxgl.accessToken = 'pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q';

map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v6.json',
    center: [-95.486052,37.830348],
    zoom: 4
});

// Add heatmap to the map
heatmap = mapboxgl_heatmap.heatmap(map);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.Navigation());

//bootstrap web socket
// webSocket.on('data', msgRec);
