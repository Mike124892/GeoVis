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
        const response = await import(/* webpackChunkName: "cityPop" */ './data/cityPop.json');
        const jsonData = response.default;
        console.log('JSON data loaded:', jsonData);
        localStorage.setItem('cityPopData', JSON.stringify(jsonData)); // Cache data
        return jsonData;
    }
}

function addPopulationLines(data) {
    console.time('addPopulationLines');
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
    console.timeEnd('addPopulationLines');
}

// Load GeoJSON data and add it to the viewer
async function loadGeoJsonData(url) {
    console.time(`loadGeoJsonData: ${url}`);
    const dataSource = await Cesium.GeoJsonDataSource.load(url);
    dataSource.show = false;  // Hide data source initially
    viewer.dataSources.add(dataSource);
    console.timeEnd(`loadGeoJsonData: ${url}`);
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

function flattenCoordinates(coordinates) {
    const flatCoords = [];
    coordinates.forEach(coord => {
        if (typeof coord[0] === 'number') {
            flatCoords.push(...coord);
        } else {
            flatCoords.push(...flattenCoordinates(coord));
        }
    });
    return flatCoords;
}

async function createHeatmapOverlay(data, minPopulation, maxPopulation, geoJsonData, viewKey) {
    console.time(`createHeatmapOverlay: ${viewKey}`);
    geoJsonData.features.forEach(feature => {
        var properties = feature.properties;
        var populationEntry = data.find(entry => entry.name === properties.name);

        if (populationEntry) {
            var population = parseInt(properties.population);
            var normalizedPopulation = (population - minPopulation) / (maxPopulation - minPopulation);
            var color = Cesium.Color.fromHsl(
                0.66 - (0.66 * normalizedPopulation), // Hue
                1.0,
                0.5 + (0.25 * normalizedPopulation)  // Lightness
            );

            var entityId = `heatmap-${properties.name}`;
            var existingEntity = viewer.entities.getById(entityId);
            if (!existingEntity) {
                try {
                    var coordinates = feature.geometry.coordinates;
                    if (feature.geometry.type === 'Polygon') {
                        coordinates = coordinates.flat(2);
                    } else if (feature.geometry.type === 'MultiPolygon') {
                        coordinates = coordinates.flat(3);
                    }

                    if (coordinates.some(coord => typeof coord !== 'number')) {
                        throw new Error('Invalid coordinates');
                    }

                    var entity = viewer.entities.add({
                        id: entityId,
                        name: properties.name,
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinates),
                            material: color.withAlpha(0.6)
                        }
                    });
                    cachedEntities[viewKey].push(entity);
                } catch (error) {
                    console.error('Error creating entity:', error);
                }
            } else {
                existingEntity.polygon.material = color.withAlpha(0.6);
                existingEntity.show = true;
                cachedEntities[viewKey].push(existingEntity);
            }
        }
    });
    console.timeEnd(`createHeatmapOverlay: ${viewKey}`);
}

// Button event listeners
document.getElementById('globalPopulationBtn').addEventListener('click', () => switchView('global'));
document.getElementById('usaPopulationBtn').addEventListener('click', () => switchView('usa'));
document.getElementById('waPopulationBtn').addEventListener('click', () => switchView('wa'));

// Initialize the application
async function preloadData() {
    console.time('preloadData');
    const populationData = await fetchPopulationData();
    const stateGeoJson = await fetch('data/states.geojson').then(response => response.json());
    const waData = await fetch('data/wa_countiesPop.json').then(response => response.json());
    const waGeoJson = await fetch('data/wa_counties.geojson').then(response => response.json());

    const stateData = stateGeoJson.features.map(feature => ({
        name: feature.properties.name,
        population: feature.properties.population
    }));
    localStorage.setItem('stateData', JSON.stringify(stateData));
    localStorage.setItem('stateGeoJson', JSON.stringify(stateGeoJson));
    localStorage.setItem('waData', JSON.stringify(waData));
    localStorage.setItem('waGeoJson', JSON.stringify(waGeoJson));

    console.timeEnd('preloadData');

    return {
        populationData,
        stateData,
        stateGeoJson,
        waData,
        waGeoJson
    };
}

function switchView(type) {
    console.time('switchView');

    function hideGlobalEntities() {
        cachedEntities.global.forEach(entity => entity.show = false);
    }

    hideAllEntities(); // Hide all entities before showing the relevant ones

    switch(type) {
        case 'global':
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
   console.log('Preloaded Data:', data);
       addPopulationLines(data.populationData);
       loadGeoJsonData('data/states.geojson').then(dataSource => {
           countiesDataSource = dataSource;
           console.log('Loaded State GeoJSON Data:', data.stateGeoJson);
           createHeatmapOverlay(data.stateData, Math.min(...data.stateData.map(item => item.population)), Math.max(...data.stateData.map(item => item.population)), data.stateGeoJson, 'usa');
       });
       loadGeoJsonData('data/wa_counties.geojson').then(dataSource => {
           waDataSource = dataSource;
           console.log('Loaded WA GeoJSON Data:', data.waGeoJson);
           createHeatmapOverlay(data.waData, Math.min(...data.waData.map(item => item.population)), Math.max(...data.waData.map(item => item.population)), data.waGeoJson, 'wa');
       });
       document.getElementById('loadingScreen').style.display = 'none';
   }).catch(error => {
       console.error('Error during preload:', error);
       document.getElementById('loadingScreen').style.display = 'none';
   });