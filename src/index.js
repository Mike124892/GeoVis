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
fetch('data/cityPop.json')
    .then(response => response.json())
    .then(jsonData => {
        console.log('JSON data loaded:', jsonData);
        addPopulationLines(jsonData);
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Disable clustering for troubleshooting
viewer.entities.clustering.enabled = false;

// Function to add lines based on population with gradient coloring
function addPopulationLines(data) {
    // Find min and max population
    var populations = data.map(city => city.population);
    var minPopulation = Math.min(...populations);
    var maxPopulation = Math.max(...populations);

    data.forEach(function(city) {
        var height = city.population / 5000;
        var surfacePosition = Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude);
        var heightPosition = Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude, height * 1000);

        // Calculate color based on population
        var normalizedPopulation = (city.population - minPopulation) / (maxPopulation - minPopulation);
        var lineColor = Cesium.Color.fromHsl(
            0.66 - (0.66 * normalizedPopulation), // Hue from blue (0.66) to green (0.33)
            1.0,
            0.5 + (0.25 * normalizedPopulation)  // Lightness from dark (0.5) to light (0.75)
        );

        viewer.entities.add({
            name: city.name,
            polyline: {
                positions: [surfacePosition, heightPosition],
                width: 2,
                material: new Cesium.ColorMaterialProperty(lineColor)
            }
        });
    });
}
