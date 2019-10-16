const WeatherPrediction = require('./WeatherPrediction.js')

class WindPrediction extends WeatherPrediction {
    constructor(from, to, unit, time, place) {
        super('cloudCoveragePrediction', from, to, unit, time, place)
    }
}

module.exports = WindPrediction