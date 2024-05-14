var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNTVlNmQwMy0xOWJjLTQ3ZDEtYjg0Yi03NGVkYjg3YjQ5ZTkiLCJpZCI6MjE0MzU1LCJpYXQiOjE3MTU2NjU2OTd9.I3zQAB7RfrPIq2hAt1IigfveLftPkGaN6xhhKWkhfds';

var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    baseLayer: false,
    baseLayerPicker: false,
    fullscreenButton: true,
    geocoder: false,
    homeButton: true,  
    infoBox: false,  
    sceneModePicker: false,  
    selectionIndicator: false,  
    timeline: false,  
    navigationHelpButton: false, 
    scene3DOnly: true,
});

// Make bing labels the default imagery layer
Cesium.IonImageryProvider.fromAssetId(3).then(provider => {
    viewer.imageryLayers.addImageryProvider(provider);
});

// Assume countryPopData is already loaded (You might load this via an Ajax call or directly include it in your project)
var countryPopData = [
    { name: "USA", latitude: 38.9072, longitude: -77.0369, population: 327200000 },
    { name: "China", latitude: 39.9042, longitude: 116.4074, population: 1393000000 },
    { name: "India", latitude: 28.6139, longitude: 77.2090, population: 1339000000 }
    // Add more countries as needed
];

function addPillars(data) {
    data.forEach(function(country) {
        var height = country.population / 100000; // Scaling factor for visualization
        viewer.entities.add({
            name: country.name,
            position: Cesium.Cartesian3.fromDegrees(country.longitude, country.latitude),
            cylinder: {
                length: height * 1000, // Adjust height multiplier as needed
                topRadius: 200000, // Fixed top radius
                bottomRadius: 200000, // Fixed bottom radius
                material: Cesium.Color.RED.withAlpha(0.5)
            }
        });
    });
}

addPillars(countryPopData);
