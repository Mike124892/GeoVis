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
var countiesDataSource;

function loadCountiesData() {
    return Cesium.GeoJsonDataSource.load('data/counties.geojson').then(dataSource => {
        countiesDataSource = dataSource;
        viewer.dataSources.add(dataSource);

        // Apply styling to the GeoJSON data
        var entities = dataSource.entities.values;
        entities.forEach(entity => {
            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.5);
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.BLACK;
            entity.polygon.outlineWidth = 2;
        });
        return dataSource;
    }).catch(error => console.error('Error loading GeoJSON data:', error));
}

// Monitor the zoom level and switch between pillars and overlay
viewer.camera.changed.addEventListener(function() {
    var height = viewer.camera.positionCartographic.height;
    if (height < 10000000) {
        // Zoomed in: show 2D overlay, hide pillars
        viewer.entities.suspendEvents();
        viewer.entities.values.forEach(entity => {
            entity.show = false;
        });
        viewer.entities.resumeEvents();
        if (countiesDataSource) {
            countiesDataSource.show = true;
        }
    } else {
        // Zoomed out: show pillars, hide 2D overlay
        viewer.entities.suspendEvents();
        viewer.entities.values.forEach(entity => {
            entity.show = true;
        });
        viewer.entities.resumeEvents();
        if (countiesDataSource) {
            countiesDataSource.show = false;
        }
    }
});

// Initialize the application
Promise.all([fetchPopulationData(), loadCountiesData()])
    .then(([populationData, countiesData]) => {
        addPopulationLines(populationData);
        // Hide loading screen
        document.getElementById('loadingScreen').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        document.getElementById('loadingScreen').style.display = 'none';
    });