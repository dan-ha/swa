const Event = require('./Event.js')

class WeatherPrediction extends Event {
    constructor(type, from, to, unit, time, place) {
        super(time, place)
        this.from = from
        this.to = to
        this.type = type
        this.unit = unit
    }

    matches(weatherData) {
        if (this.unit !== weatherData.unit) {
            if (this.unit === 'c') {
                weatherData.convertToC()
            }
            if (this.unit === 'f') {
                weatherData.convertToF()
            }
        }
        return this.from <= weatherData.value && this.to >= weatherData.value
    }
}

module.exports = WeatherPrediction