const Event = require('./Event.js')
const DataType = require('./DataType.js')

function WeatherData(value, type, unit, time, place) {
    Event.call(this, time, place)

    this.value = value
    this.dataType = new DataType(type, unit)
}

WeatherData.prototype = Object.create(Event.prototype)
Object.defineProperty(WeatherData.prototype, 'constructor', {
    value: WeatherData,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});

module.exports = WeatherData