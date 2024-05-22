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

async function fetchPopulationData() {
    const cachedData = localStorage.getItem('cityPopData');
    if (cachedData) {
        console.log('Using cached data');
        return JSON.parse(cachedData);
    } else {
        const response = await fetch('data/cityPop.json');
        const jsonData = await response.json();
        console.log('JSON data loaded:', jsonData);
        localStorage.setItem('cityPopData', JSON.stringify(jsonData)); // Cache data
        return jsonData;
    }
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

        var entity = viewer.entities.add({
            name: city.name,
            polyline: {
                positions: [surfacePosition, heightPosition],
                width: 5,
                material: new Cesium.ColorMaterialProperty(lineColor)
            }
        });
        cachedEntities.global.push(entity);
    });
}

// Load GeoJSON data and add it to the viewer
async function loadGeoJsonData(url) {
    const dataSource = await Cesium.GeoJsonDataSource.load(url);
    dataSource.show = false;  // Hide data source initially
    viewer.dataSources.add(dataSource);
    return dataSource;
}

let countiesDataSource, waDataSource;
let cachedEntities = {
    global: [],
    usa: [],
    wa: []
};

function hideAllEntities() {
    console.time('hideAllEntities');
    viewer.entities.suspendEvents();
    viewer.entities.values.forEach(entity => {
        entity.show = false;
    });
    viewer.entities.resumeEvents();
    if (countiesDataSource) countiesDataSource.show = false;
    if (waDataSource) waDataSource.show = false;
    console.timeEnd('hideAllEntities');
}

// Function to create a heatmap overlay
async function createHeatmapOverlay(data, minPopulation, maxPopulation, geoJsonData, viewKey) {
    geoJsonData.features.forEach(feature => {
        var properties = feature.properties;
        var populationEntry = data.find(entry => entry.region === properties.name || entry.subregion === properties.NAME);
        
        if (populationEntry) {
            var population = parseInt(populationEntry.population);
            var normalizedPopulation = (population - minPopulation) / (maxPopulation - minPopulation);
            var color = Cesium.Color.fromHsl(
                0.66 - (0.66 * normalizedPopulation), // Hue
                1.0,
                0.5 + (0.25 * normalizedPopulation)  // Lightness
            );

            var entityId = `heatmap-${properties.name || properties.NAME}`;
            var existingEntity = viewer.entities.getById(entityId);
            if (!existingEntity) {
                var entity = viewer.entities.add({
                    id: entityId,
                    name: properties.name || properties.NAME,
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray(
                            feature.geometry.coordinates.flat(2)
                        ),
                        material: color.withAlpha(0.6)
                    }
                });
                cachedEntities[viewKey].push(entity);
            } else {
                existingEntity.polygon.material = color.withAlpha(0.6);
                existingEntity.show = true;
                cachedEntities[viewKey].push(existingEntity);
            }
        }
    });
}

// Button event listeners
document.getElementById('globalPopulationBtn').addEventListener('click', () => switchView('global'));
document.getElementById('usaPopulationBtn').addEventListener('click', () => switchView('usa'));
document.getElementById('waPopulationBtn').addEventListener('click', () => switchView('wa'));

// Initialize the application
async function preloadData() {
    console.time('preloadData');
    const populationData = await fetchPopulationData();
    const stateData = await fetch('data/statePop.json').then(response => response.json());
    const waData = await fetch('data/wa_countiesPop.json').then(response => response.json());
    const stateGeoJson = await fetch('data/states.json').then(response => response.json());
    const waGeoJson = await fetch('data/wa_counties.geojson').then(response => response.json());

    localStorage.setItem('stateData', JSON.stringify(stateData));
    localStorage.setItem('waData', JSON.stringify(waData));
    localStorage.setItem('stateGeoJson', JSON.stringify(stateGeoJson));
    localStorage.setItem('waGeoJson', JSON.stringify(waGeoJson));

    console.timeEnd('preloadData');

    return {
        populationData,
        stateData,
        waData,
        stateGeoJson,
        waGeoJson
    };
}

function switchView(type) {
    console.time('switchView');

    function hideGlobalEntities() {
        cachedEntities.global.forEach(entity => entity.show = false);
    }

    switch(type) {
        case 'global':
            hideAllEntities();
            viewer.entities.suspendEvents();
            cachedEntities.global.forEach(entity => entity.show = true);
            viewer.entities.resumeEvents();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(0, 0, 30000000),
                duration: 1, // Reduce duration to improve performance
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            break;
        case 'usa':
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(-99.1332, 38.9637, 5000000),
                duration: 1, // Reduce duration to improve performance
                complete: () => {
                    hideAllEntities();
                    viewer.entities.suspendEvents();
                    cachedEntities.usa.forEach(entity => entity.show = true);
                    viewer.entities.resumeEvents();
                },
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            break;
        case 'wa':
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(-120.7401, 47.7511, 1000000),
                duration: 1, // Reduce duration to improve performance
                complete: () => {
                    hideAllEntities();
                    viewer.entities.suspendEvents();
                    cachedEntities.wa.forEach(entity => entity.show = true);
                    viewer.entities.resumeEvents();
                },
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            break;
    }
    console.timeEnd('switchView');
}

preloadData().then(data => {
    addPopulationLines(data.populationData);
    loadGeoJsonData('data/states.json').then(dataSource => { 
        countiesDataSource = dataSource; 
        createHeatmapOverlay(data.stateData, Math.min(...data.stateData.map(item => item.population)), Math.max(...data.stateData.map(item => item.population)), data.stateGeoJson, 'usa');
    });
    loadGeoJsonData('data/wa_counties.geojson').then(dataSource => { 
        waDataSource = dataSource; 
        createHeatmapOverlay(data.waData, Math.min(...data.waData.map(item => item.population)), Math.max(...data.waData.map(item => item.population)), data.waGeoJson, 'wa');
    });
    // Hide loading screen
    document.getElementById('loadingScreen').style.display = 'none';
}).catch(error => {
    console.error(error);
    document.getElementById('loadingScreen').style.display = 'none';
});