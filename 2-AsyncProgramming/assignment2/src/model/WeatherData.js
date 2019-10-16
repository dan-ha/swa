import Event from './Event.js'

export default class WeatherData extends Event {
    constructor(value, dataType, time, place) {
        super(time, place)
        this.value = value
        this.dataType = dataType
    }
    get type() { return this.dataType.type }
    get unit() { return this.dataType.unit }
}
