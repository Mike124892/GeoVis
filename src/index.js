var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');

var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,  // Disable animation widget
    baseLayerPicker: false,  // Disable base layer picker
    fullscreenButton: false,  // Disable fullscreen button
    geocoder: false,  // Disable geocoder/search widget
    homeButton: false,  // Disable home button
    infoBox: false,  // Disable info box
    sceneModePicker: false,  // Disable scene mode picker
    selectionIndicator: false,  // Disable selection indicator
    timeline: false,  // Disable timeline widget
    navigationHelpButton: false,  // Disable navigation help button
    scene3DOnly: true  // Enable 3D only mode
});