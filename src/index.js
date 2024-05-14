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

// Load data from JSON and add it to the globe
fetch('data/countryPop.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        console.log('JSON data loaded:', jsonData); // Log the loaded JSON data
        addPillars(jsonData);
    })
    .catch(error => console.error('Error loading JSON data:', error));

function addPillars(data) {
    data.forEach(function(country) {
        var height = country.population / 100000; // Scaling factor for visualization
        var surfacePosition = Cesium.Cartesian3.fromDegrees(country.longitude, country.latitude);
        var topPosition = Cesium.Cartesian3.fromDegrees(country.longitude, country.latitude, height * 1000);

        viewer.entities.add({
            name: country.name,
            position: new Cesium.CallbackProperty(function() {
                return Cesium.Cartesian3.midpoint(surfacePosition, topPosition, new Cesium.Cartesian3());
            }, false),
            cylinder: {
                length: height * 1000, // Adjust height multiplier as needed
                topRadius: 100000, // Fixed top radius
                bottomRadius: 100000, // Fixed bottom radius
                material: Cesium.Color.RED.withAlpha(0.5),
            }
        });
    });
}
