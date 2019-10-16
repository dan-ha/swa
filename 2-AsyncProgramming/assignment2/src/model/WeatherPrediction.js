import Event from './Event.js'

export default class WeatherPrediction extends Event {
    constructor(from, to, dataType, time, place) {
        super(time, place)
        this.from = from
        this.to = to
        this.dataType = dataType
    }
    get type() { return this.dataType.type }
    get unit() { return this.dataType.unit }
    matches(weatherData) {
        return this.from <= weatherData.value && this.to >= weatherData.value
    }
}
