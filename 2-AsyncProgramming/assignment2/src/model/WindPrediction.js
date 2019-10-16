import WeatherPrediction from './WeatherPrediction.js'
import DataType from './DataType.js'

export default class WindPrediction extends WeatherPrediction {
    constructor(directions, from, to, unit, time, place) {
        super(from, to, new DataType('windPrediction', unit), time, place)
        this.directions = directions
    }
    matches(weatherData) {
        let res = false
        if (weatherData.type === 'wind') {
            if (weatherData.place === this.place) {
                if (weatherData.unit !== this.unit) {
                    weatherData = this.unit === 'ms' ? weatherData.convertToMS() : weatherData.convertToMPH()
                }
                res =
                    this.directions.includes(weatherData.direction)
                    && weatherData.value >= this.from
                    && weatherData.value <= this.to
            }
        }
        return res
    }
    convertToMPH() {
        if (this.unit === 'ms') {
            const fromMPH = this.from * 2.2369362921
            const toMPH = this.to * 2.2369362921
            return new WindPrediction(this.directions, fromMPH, toMPH, 'mph', this.time, this.place)
        } else {
            return this
        }
    }
    convertToMS() {
        if (this.unit === 'mph') {
            const fromMS = this.from * 0.44704
            const toMS = this.to * 0.44704
            return new WindPrediction(this.directions, fromMS, toMS, 'ms', this.time, this.place)
        } else {
            return this
        }
    }
    toString() {
        return `Wind: ${this.from}/${this.to} ${this.unit}. ${this.directions}`
    }
}
