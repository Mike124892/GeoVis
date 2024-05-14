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

const layers = viewer.imageryLayers;

// Make bing labels the default imagery layer
const bingMapsAerialWithLabels = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3)
  );
layers.add(bingMapsAerialWithLabels);