const WeatherPrediction = require('./WeatherPrediction.js')

class PrecipitationPrediction extends WeatherPrediction {
    constructor(types, from, to, unit, time, place) {
        super('precipitationPrediction', from, to, unit, time, place)
        this.types = types
    }

    matches(weatherData) {
        if (this.unit !== weatherData.unit) {
            if (this.unit === 'mm') {
                weatherData.convertToMM()
            }
            if (this.unit === 'in') {
                weatherData.convertToInches()
            }
        }
        return weatherData.type === 'precipitation' 
            && this.types.includes(weatherData.precipitationType)
                && (this.from <= weatherData.value && this.to >= weatherData.value)
    }

    convertToInches() {
        if (this.unit === 'mm') {
            this.unit = 'in'
            this.value *= 0.03937008
        }
    }

    convertToMM() {
        if (this.unit === 'in') {
            this.unit = 'mm'
            this.value *= 25.4
        }
    }
}

module.exports = PrecipitationPrediction