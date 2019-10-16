const WeatherPrediction = require('./WeatherPrediction.js')

class WindPrediction extends WeatherPrediction {
    constructor(directions, from, to, unit, time, place) {
        super('windPrediction', from, to, unit, time, place)
        this.directions = directions
    }

    matches(weatherData) {
        if (this.dataType.unit !== weatherData.dataType.unit) {
            if (this.dataType.unit === 'mph') {
                weatherData.convertToMPH()
            }
            if (this.dataType.unit === 'ms') {
                weatherData.convertToMS()
            }
        }
        return weatherData.dataType.type === 'wind' 
            && (this.directions.includes(weatherData.direction)
                && (this.from <= weatherData.value && this.to >= weatherData.value))
    }

    convertToMPH() {
        if (this.dataType.unit === 'ms') {
            this.dataType.unit = 'mph'
            this.value *= 2.2369362921
        }
    }

    convertToMS() {
        if (this.dataType.unit === 'mph') {
            this.dataType.unit = 'ms'
            this.value *= 0.44704
        }
    }
}

module.exports = WindPrediction