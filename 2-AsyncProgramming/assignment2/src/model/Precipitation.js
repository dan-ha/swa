import WeatherData from './WeatherData.js'
import DataType from './DataType.js'

export default class Precipitation extends WeatherData {
    constructor(precipitationType, value, unit, time, place) {
        super(value, new DataType('precipitation', unit), time, place)
        this.precipitationType = precipitationType
    }

    convertToInches() {
        if (this.unit == 'mm') {
            const inches = this.value * 0.03937008
            return new Precipitation(this.precipitationType, inches, 'in', this.time, this.place)
        } else {
            return this
        }
    }
    convertToMM() {
        if (this.unit == 'in') {
            const mm = this.value * 25.4
            return new Precipitation(this.precipitationType, mm, 'mm', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `${this.type}: ${this.precipitationType} - ${this.value}${this.unit}, ${this.time.toLocaleString()}, ${this.place}`
    }
}
