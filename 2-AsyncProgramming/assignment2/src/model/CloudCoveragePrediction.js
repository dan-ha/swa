import WeatherPrediction from './WeatherPrediction.js'
import DataType from './DataType.js'

export default class CloudCoveragePrediction extends WeatherPrediction {
    constructor(from, to, unit, time, place) {
        super(from, to, new DataType('cloudCoveragePrediction', unit), time, place)
    }
    toString() {
        return `CloudCoverage: ${this.from}/${this.to} ${this.unit}`
    }
}
