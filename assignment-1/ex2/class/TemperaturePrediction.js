const WeatherPrediction = require('./WeatherPrediction.js')

class TemperaturePrediction extends WeatherPrediction {
    constructor(from, to, unit, time, place) {
        super('temperaturePrediction', from, to, unit, time, place)
    }

    convertToF() {
        if (this.unit === 'c') {
            this.unit = 'f'
            this.value = this.value * 1.8 + 32
        }
    }

    convertToC() {
        if (this.unit === 'f') {
            this.unit = 'c'
            this.value = (this.value - 32) / 1.8
        }
    }
}

module.exports = TemperaturePrediction