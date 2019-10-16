import WeatherPrediction from './WeatherPrediction.js'
import DataType from './DataType.js'

export default class PrecipitationPrediction extends WeatherPrediction {
    constructor(types, from, to, unit, time, place) {
        super(from, to, new DataType('precipitationPrediction', unit), time, place)
        this.types = types
    }
    matches(weatherData) {
        let res = false
        if (weatherData.type === 'precipitation') {
            if (weatherData.place === this.place) {
                if (weatherData.unit !== this.unit) {
                    weatherData = this.unit === 'mm' ? weatherData.convertToMM() : weatherData.convertToInches()
                }
                res =
                    this.types.includes(weatherData.precipitationType)
                    && weatherData.value >= this.from
                    && weatherData.value <= this.to
            }
        }
        return res
    }
    convertToInches() {
        if (this.unit === 'mm') {
            const fromIn = this.from * 0.03937008
            const toIn = this.to * 0.03937008
            return new PrecipitationPrediction(this.types, fromIn, toIn, 'in', this.time, this.place)
        } else {
            return this
        }

    }
    convertToMM() {
        if (this.unit === 'in') {
            const fromMM = this.from * 25.4
            const toMM = this.to * 25.4
            return new PrecipitationPrediction(this.types, fromMM, toMM, 'mm', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `Precipitation: ${this.from}/${this.to} ${this.unit}. ${this.types}`
    }
}