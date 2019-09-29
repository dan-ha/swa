const WeatherPrediction = require('./WeatherPrediction.js')

class WindPrediction extends WeatherPrediction {
    constructor(directions, from, to, unit, time, place) {
        super('windPrediction', from, to, unit, time, place)
        this.directions = directions
    }

    matches(weatherData) {
        if (this.unit !== weatherData.unit) {
            if (this.unit === 'mph') {
                weatherData.convertToMPH()
            }
            if (this.unit === 'ms') {
                weatherData.convertToMS()
            }
        }
        console.log(weatherData.type === 'wind')
        return weatherData.type === 'wind' 
            && (this.directions.includes(weatherData.direction)
                && (this.from <= weatherData.value && this.to >= weatherData.value))
    }

    convertToMPH() {
        if (this.unit === 'ms') {
            this.unit = 'mph'
            this.value *= 2.2369362921
        }
    }

    convertToMS() {
        if (this.unit === 'mph') {
            this.unit = 'ms'
            this.value *= 0.44704
        }
    }
}

module.exports = WindPrediction