import WeatherData from './WeatherData.js'
import DataType from './DataType.js'

export default class CloudCoverage extends WeatherData {
    constructor(value, unit, time, place) {
        super(value, new DataType('cloudCoverage', unit), time, place)
    }
    toString() {
        return `${this.type}: ${this.value}${this.unit}, ${this.time.toLocaleString()}, ${this.place}`
    }
}
