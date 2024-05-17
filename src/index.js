var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNTVlNmQwMy0xOWJjLTQ3ZDEtYjg0Yi03NGVkYjg3YjQ5ZTkiLCJpZCI6MjE0MzU1LCJpYXQiOjE3MTU2NjU2OTd9.I3zQAB7RfrPIq2hAt1IigfveLftPkGaN6xhhKWkhfds';

var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: true,
    homeButton: true,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    scene3DOnly: true,
    useDefaultRenderLoop: true,
});

// Set Bing labels as the default imagery layer
Cesium.IonImageryProvider.fromAssetId(3).then(provider => {
    viewer.imageryLayers.addImageryProvider(provider);
});

// Load data from JSON and add it to the globe
fetch('data/countryPop.json')
    .then(response => response.json())
    .then(jsonData => {
        console.log('JSON data loaded:', jsonData);
        addPopulationLines(jsonData);
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Disable clustering for troubleshooting
viewer.entities.clustering.enabled = false;

// Function to add lines based on population
function addPopulationLines(data) {
    data.forEach(function(country) {
        var height = country.population / 100000; // Scaling factor for visualization
        var surfacePosition = Cesium.Cartesian3.fromDegrees(country.longitude, country.latitude);
        var heightPosition = Cesium.Cartesian3.fromDegrees(country.longitude, country.latitude, height * 1000);

        var colorScale = 0.6 - (height / 200); // Adjust color based on population height
        var lineColor = Cesium.Color.fromHsl(colorScale, 1.0, 0.5);

        viewer.entities.add({
            name: country.name,
            polyline: {
                positions: [surfacePosition, heightPosition],
                width: 5,
                material: new Cesium.ColorMaterialProperty(lineColor)
            }
        });
    });
}