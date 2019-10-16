const WeatherPrediction = require('./WeatherPrediction.js')

class PrecipitationPrediction extends WeatherPrediction {
    constructor(types, from, to, unit, time, place) {
        super('precipitationPrediction', from, to, unit, time, place)
        this.types = types
    }

    matches(weatherData) {
        if (this.unit !== weatherData.dataType.unit) {
            if (this.dataType.unit === 'mm') {
                weatherData.convertToMM()
            }
            if (this.dataType.unit === 'in') {
                weatherData.convertToInches()
            }
        }
        return weatherData.dataType.type === 'precipitation' 
            && this.types.includes(weatherData.precipitationType)
                && (this.from <= weatherData.value && this.to >= weatherData.value)
    }

    convertToInches() {
        if (this.dataType.unit === 'mm') {
            this.dataType.unit = 'in'
            this.value *= 0.03937008
        }
    }

    convertToMM() {
        if (this.dataType.unit === 'in') {
            this.dataType.unit = 'mm'
            this.value *= 25.4
        }
    }
}

module.exports = PrecipitationPrediction