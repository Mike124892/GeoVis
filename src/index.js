var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTQwODE4NS03M2VhLTQ2NDgtOTEwNS1lYjVjMDQ0ZDlkN2QiLCJpZCI6MjE0MzU1LCJpYXQiOjE3MTYyNDYzNDN9.ZDtqZHXxyqetQHThLIPcfZhNPJNlVKoHg0uU4Q-e5TA';

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

Cesium.IonImageryProvider.fromAssetId(3).then(provider => {
    viewer.imageryLayers.addImageryProvider(provider);
});

// Display loading screen
document.getElementById('loadingScreen').style.display = 'block';

// Load data from JSON and add it to the globe
function fetchPopulationData() {
    return new Promise((resolve, reject) => {
        const cachedData = localStorage.getItem('cityPopData');
        if (cachedData) {
            console.log('Using cached data');
            resolve(JSON.parse(cachedData));
        } else {
            fetch('data/cityPop.json')
                .then(response => response.json())
                .then(jsonData => {
                    console.log('JSON data loaded:', jsonData);
                    localStorage.setItem('cityPopData', JSON.stringify(jsonData)); // Cache data
                    resolve(jsonData);
                })
                .catch(error => reject('Error loading JSON data:', error));
        }
    });
}

function addPopulationLines(data) {
    var populations = data.map(city => city.population);
    var minPopulation = Math.min(...populations);
    var maxPopulation = Math.max(...populations);

    data.forEach(function(city) {
        var height = city.population / 5000;
        var surfacePosition = Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude);
        var heightPosition = Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude, height * 1000);
        var normalizedPopulation = (city.population - minPopulation) / (maxPopulation - minPopulation);
        var lineColor = Cesium.Color.fromHsl(
            0.66 - (0.66 * normalizedPopulation), // Hue
            1.0,
            0.5 + (0.25 * normalizedPopulation)  // Lightness
        );

        viewer.entities.add({
            name: city.name,
            polyline: {
                positions: [surfacePosition, heightPosition],
                width: 5,
                material: new Cesium.ColorMaterialProperty(lineColor)
            }
        });
    });
}

// Load GeoJSON data and add it to the viewer
var countiesDataSource, waDataSource;

function loadGeoJsonData(url) {
    return Cesium.GeoJsonDataSource.load(url).then(dataSource => {
        dataSource.show = false;  // Hide data source initially
        viewer.dataSources.add(dataSource);
        return dataSource;
    }).catch(error => console.error('Error loading GeoJSON data:', error));
}

function hideAllEntities() {
    viewer.entities.suspendEvents();
    viewer.entities.values.forEach(entity => {
        entity.show = false;
    });
    viewer.entities.resumeEvents();
    if (countiesDataSource) countiesDataSource.show = false;
    if (waDataSource) waDataSource.show = false;
}

// Button event listeners
document.getElementById('globalPopulationBtn').addEventListener('click', function() {
    hideAllEntities();
    viewer.entities.suspendEvents();
    viewer.entities.values.forEach(entity => {
        entity.show = true;
    });
    viewer.entities.resumeEvents();
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(0, 0, 30000000), // Zoom out to global view
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0), // Bird's eye view
            roll: 0.0
        }
    });
});

document.getElementById('usaPopulationBtn').addEventListener('click', function() {
    hideAllEntities();
    if (countiesDataSource) {
        countiesDataSource.show = true;
    }
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-99.1332, 38.9637, 5000000), // Zoom to contiguous USA
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0), // Bird's eye view
            roll: 0.0
        }
    });
});

document.getElementById('waPopulationBtn').addEventListener('click', function() {
    hideAllEntities();
    if (waDataSource) {
        waDataSource.show = true;
    }
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-120.7401, 47.7511, 1000000), // Zoom to Washington state
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0), // Bird's eye view
            roll: 0.0
        }
    });
});

// Initialize the application
Promise.all([
    fetchPopulationData(),
    loadGeoJsonData('data/states.json').then(dataSource => { countiesDataSource = dataSource; }),
    loadGeoJsonData('data/wa_counties.geojson').then(dataSource => { waDataSource = dataSource; })
])
.then(([populationData]) => {
    addPopulationLines(populationData);
    // Hide loading screen
    document.getElementById('loadingScreen').style.display = 'none';
})
.catch(error => {
    console.error(error);
    document.getElementById('loadingScreen').style.display = 'none';
});