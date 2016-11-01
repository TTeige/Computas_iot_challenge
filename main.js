var SensorTag = require('sensortag');

SensorTag.discover(onDiscover);

function onDiscover(sensorTag) {
	console.log(sensorTag);
}