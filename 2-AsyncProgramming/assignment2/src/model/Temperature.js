import WeatherData from './WeatherData.js'
import DataType from './DataType.js'

export default class Temperature extends WeatherData {
    constructor(value, unit, time, place) {
        super(value, new DataType('temperature', unit), time, place)
    }

    convertToF() {
        if (this.unit == 'C') {
            const farenheit = this.value * 1.8 + 32
            return new Temperature(farenheit, 'F', this.time, this.place)
        } else {
            return this
        }
    }
    convertToC() {
        if (this.unit == 'F') {
            const celsius = (this.value - 32) / 1.8
            return new Temperature(celsius, 'C', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `${this.type}: ${this.value}${this.unit}, ${this.time.toLocaleString()}, ${this.place}`
    }
}
