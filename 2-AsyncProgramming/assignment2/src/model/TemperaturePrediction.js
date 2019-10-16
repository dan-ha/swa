import WeatherPrediction from './WeatherPrediction.js'
import DataType from './DataType.js'

export default class TemperaturePrediction extends WeatherPrediction {
    constructor(from, to, unit, time, place) {
        super(from, to, new DataType('temperaturePrediction', unit), time, place)
    }

    convertToF() {
        if (this.type == 'c') {
            const fromF = this.from * 1.8 + 32
            const toF = this.to * 1.8 + 32
            return new TemperaturePrediction(fromF, toF, 'f', this.time, this.place)
        } else {
            return this
        }
    }
    convertToC() {
        if (this.type == 'f') {
            const fromC = (this.from - 32) / 1.8
            const toC = (this.to - 32) / 1.8
            return new TemperaturePrediction(fromC, toC, 'c', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `Temperature: ${this.from}/${this.to} ${this.unit}`
    }
}
