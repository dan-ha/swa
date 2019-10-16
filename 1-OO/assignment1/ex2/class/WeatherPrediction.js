const Event = require('./Event.js')
const DataType = require('./DataType.js')

class WeatherPrediction extends Event {
    constructor(type, from, to, unit, time, place) {
        super(time, place)
        this.from = from
        this.to = to
        this.dataType = new DataType(type, unit)
    }

    matches(weatherData) {
        if (this.dataType.unit !== weatherData.dataType.unit) {
            if (this.dataType.unit === 'c') {
                weatherData.convertToC()
            }
            if (this.dataType.unit === 'f') {
                weatherData.convertToF()
            }
        }
        return this.from <= weatherData.value && this.to >= weatherData.value
    }
}

module.exports = WeatherPrediction