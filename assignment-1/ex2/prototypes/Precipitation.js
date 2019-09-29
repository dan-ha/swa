const WeatherData = require('./WeatherData.js')

function Precipitation(precipitationType, value, unit, time, place) {
    WeatherData.call(this, value, 'precipitation', unit, time, place)

    this.precipitationType = precipitationType
}

Precipitation.prototype = Object.create(WeatherData.prototype)
Object.defineProperty(Precipitation.prototype, 'constructor', {
    value: Precipitation,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});

Precipitation.prototype.convertToInches = function () {
    if (this.unit === 'mm') {
        this.unit = 'in'
        this.value *= 0.03937008
    }
}

Precipitation.prototype.convertToMM = function () {
    if (this.unit === 'in') {
        this.unit = 'mm'
        this.value *= 25.4
    }
}

module.exports = Precipitation