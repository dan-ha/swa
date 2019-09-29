const WeatherData = require('./WeatherData.js')

function Wind(direction, value, unit, time, place) {
    WeatherData.call(this, value, 'wind', unit, time, place)

    this.direction = direction
}

Wind.prototype = Object.create(WeatherData.prototype)
Object.defineProperty(Wind.prototype, 'constructor', {
    value: Wind,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});

Wind.prototype.convertToMPH = function () {
    if (this.unit === 'ms') {
        this.unit = 'mph'
        this.value *= 2.2369362921
    }
}

Wind.prototype.convertToMS = function () {
    if (this.unit === 'mph') {
        this.unit = 'ms'
        this.value *= 0.44704
    }
}

module.exports = Wind