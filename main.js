var SensorTag = require('sensortag');
var request = require('request')

var log = function(text) {
  if(text) {
    console.log(text);
  }
};



// SensorTag.discoverById(id, callback(sensorTag));


//==============================================================================
// Step 1: Connect to sensortag device.
//------------------------------------------------------------------------------
// It's address is printed on the inside of the red sleeve
// (replace the one below).
var ADDRESS = "b0:b4:48:c3:5a:03";
var connected = new Promise((resolve, reject) => SensorTag.discoverByAddress(ADDRESS, (tag) => resolve(tag)))
  .then((tag) => new Promise((resolve, reject) => tag.connectAndSetup(() => resolve(tag))));



log(" ");
log("Press and hold both buttons on the SensorTag");
log("Trying to connect...");
log(" ");

var sensor = connected.then(function(tag) {
  log("connected");

  tag.enableIrTemperature(log);
  tag.notifyIrTemperature(log);

  tag.enableHumidity(log);
  tag.notifyHumidity(log);

  tag.enableGyroscope(log);
  tag.notifyGyroscope(log);

  tag.notifyAccelerometer(log);
  tag.enableAccelerometer(log);

  tag.enableLuxometer(log);
  tag.notifyLuxometer(log);
  return tag;
});


sensor.then(function(tag) {
	tag.on("irTemperatureChange", function(objectTemp, irTemp) {
		log(irTemp);
    if (irTemp > 28) {
        log("sending off signal");
        sendOffSignal();
      } else if (irTemp < 27) {
        log("sending on signal");
        sendOnSignal();
    }
	});
});

function sendOnSignal() {
  request('http://localhost:8080/on', function (err, res) {
    if (err) return console.error(err.message);
  });
}

function sendOffSignal() {
  request('http://localhost:8080/off', function (err, res) {
    if (err) return console.error(err.message);
  });
}