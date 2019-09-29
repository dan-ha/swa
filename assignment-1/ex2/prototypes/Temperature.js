const WeatherData = require('./WeatherData.js')

function Temperature(value, unit, time, place) {
    WeatherData.call(this, value, 'temperature', unit, time, place)
}

Temperature.prototype = Object.create(WeatherData.prototype)
Object.defineProperty(Temperature.prototype, 'constructor', {
    value: Temperature,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});

Temperature.prototype.convertToF = function () {
    if (this.unit === 'c') {
        this.unit = 'f'
        this.value = this.value * 1.8 + 32
    }
}

Temperature.prototype.convertToC = function () {
    if (this.unit === 'f') {
        this.unit = 'c'
        this.value = (this.value - 32) / 1.8
    }
}

module.exports = Temperature