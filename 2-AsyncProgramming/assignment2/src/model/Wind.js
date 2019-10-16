import WeatherData from './WeatherData.js'
import DataType from './DataType.js'

export default class Wind extends WeatherData {
    constructor(direction, value, unit, time, place) {
        super(value, new DataType('wind', unit), time, place)
        this.direction = direction
    }

    convertToMPH() {
        if (this.unit == 'm/s') {
            const mph = this.value * 2.2369362921
            return new Wind(this.direction, mph, 'mph', this.time, this.place)
        } else {
            return this
        }
    }
    convertToMS() {
        if (this.unit == 'mph') {
            const ms = this.value * 0.44704
            return new Wind(this.direction, ms, 'm/s', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `${this.type}: ${this.direction} - ${this.value}${this.unit}, ${this.time.toLocaleString()}, ${this.place}`
    }
}
