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
    var minPopulation = Math.min(...data.map(city => city.population));
    var maxPopulation = Math.max(...data.map(city => city.population));

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
    console.timeEnd('hideAllEntities');
}

function flattenCoordinates(coordinates) {
    return coordinates.flat(Infinity);
}

function createHeatmapOverlay(geoJsonData, viewKey) {
    console.time(`createHeatmapOverlay: ${viewKey}`);
    const colors = [
        Cesium.Color.fromCssColorString("#FCD5D8"),
        Cesium.Color.fromCssColorString("#F5A6A8"),
        Cesium.Color.fromCssColorString("#F0837D"),
        Cesium.Color.fromCssColorString("#F45352"),
        Cesium.Color.fromCssColorString("#F12D18"),
        Cesium.Color.fromCssColorString("#F91E06"),
        Cesium.Color.fromCssColorString("#DB1D02")
    ];

    geoJsonData.features.forEach(feature => {
        var properties = feature.properties;
        var heatmapLevel = properties.heatmap_level - 1; // heatmap_level is 1-based, colors array is 0-based
        var color = colors[heatmapLevel];

        var entityId = `heatmap-${properties.NAME || properties.name}`;
        var coordinates = flattenCoordinates(feature.geometry.coordinates);

        if (coordinates.some(coord => typeof coord !== 'number')) {
            console.error('Invalid coordinates', coordinates);
            return;
        }

        var entity = viewer.entities.add({
            id: entityId,
            name: properties.NAME || properties.name,
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinates),
                material: color.withAlpha(0.6),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            },
            label: {
                text: properties.NAME || properties.name,
                fillColor: Cesium.Color.BLACK,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                pixelOffset: new Cesium.Cartesian2(0, -20)
            }
        });
        cachedEntities[viewKey].push(entity);
    });
    console.timeEnd(`createHeatmapOverlay: ${viewKey}`);
}

document.getElementById('globalPopulationBtn').addEventListener('click', () => switchView('global'));
document.getElementById('usaPopulationBtn').addEventListener('click', () => switchView('usa'));
document.getElementById('waPopulationBtn').addEventListener('click', () => switchView('wa'));

async function preloadData() {
    console.time('preloadData');
    const populationData = await fetchPopulationData();
    const [stateGeoJson, waGeoJson] = await Promise.all([
        fetch('data/states.geojson').then(response => response.json()),
        fetch('data/wa_counties.geojson').then(response => response.json())
    ]);

    localStorage.setItem('stateGeoJson', JSON.stringify(stateGeoJson));
    localStorage.setItem('waGeoJson', JSON.stringify(waGeoJson));

    // Parallelize the creation of entities
    await Promise.all([
        createHeatmapOverlay(stateGeoJson, 'usa'),
        createHeatmapOverlay(waGeoJson, 'wa'),
        addPopulationLines(populationData)
    ]);

    console.timeEnd('preloadData');

    return {
        populationData,
        stateGeoJson,
        waGeoJson
    };
}

function switchView(type) {
    console.time('switchView');

    hideAllEntities(); // Hide all entities before showing the relevant ones

    switch(type) {
        case 'global':
            document.getElementById('legend').style.display = 'none';
            viewer.entities.suspendEvents();
            cachedEntities.global.forEach(entity => entity.show = true);
            viewer.entities.resumeEvents();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(0, 0, 30000000),
                duration: 1,
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            break;
        case 'usa':
            document.getElementById('legend').style.display = 'block';
            viewer.entities.suspendEvents();
            cachedEntities.usa.forEach(entity => entity.show = true);
            viewer.entities.resumeEvents();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(-99.1332, 38.9637, 5000000),
                duration: 1,
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0),
                    roll: 0.0
                }
            });
            break;
        case 'wa':
            document.getElementById('legend').style.display = 'block';
            viewer.entities.suspendEvents();
            cachedEntities.wa.forEach(entity => entity.show = true);
            viewer.entities.resumeEvents();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(-120.7401, 47.7511, 1000000),
                duration: 1,
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
    document.getElementById('loadingScreen').style.display = 'none';
}).catch(error => {
    console.error('Error during preload:', error);
    document.getElementById('loadingScreen').style.display = 'none';
});