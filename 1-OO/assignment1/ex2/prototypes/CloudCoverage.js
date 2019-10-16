const WeatherData = require('./WeatherData.js')

function CloudCoverage(value, unit, time, place) {
    WeatherData.call(this, value, 'wind', unit, time, place)
}

CloudCoverage.prototype = Object.create(WeatherData.prototype)
Object.defineProperty(CloudCoverage.prototype, 'constructor', {
    value: CloudCoverage,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});

module.exports = CloudCoverage