export default class WeatherHistory {
    constructor(data, { type, place, period } = {}) {
        this.weatherData = data
        this.type = type
        this.place = place
        this.period = period
    }

    forType(type) { return new WeatherHistory(this.weatherData, { type, place: this.place, period: this.period }) }
    forPlace(place) { return new WeatherHistory(this.weatherData, { type: this.type, place, period: this.period }) }
    forPeriod(period) { return new WeatherHistory(this.weatherData, { type: this.type, place: this.place, period }) }
    including(data) { return new WeatherHistory([...this.weatherData, ...data], { type: this.type, place: this.place, period: this.period }) }
    convertToUsUnits() {
        const weatherDataUs = this.weatherData.map((d) => {
            switch (d.type) {
                case 'temperature': return d.convertToF()
                case 'precipitation': return d.convertToInches()
                case 'wind': return d.convertToMPH()
                case 'cloudCoverage': return d
                default: return d
            }
        })
        return new WeatherHistory(weatherDataUs, { type: this.type, place: this.place, period: this.period })
    }
    convertToInternationalUnits() {
        const weatherDataInt = this.weatherData.map((d) => {
            switch (d.type) {
                case 'temperature': return d.convertToC()
                case 'precipitation': return d.convertToMM()
                case 'wind': return d.convertToMS()
                case 'cloudCoverage': return d
                default: return d
            }
        })
        return new WeatherHistory(weatherDataInt, { type: this.type, place: this.place, period: this.period })
    }
    lowestValue() {
        let result = undefined
        const data = this.data()
        if (data.length != 0) {
            let type = data[0].type
            if (data.every((d) => d.type === type)) {
                result = data.reduce((acc, cur) => Math.min(acc, cur.value), data[0].value)
            }
        }
        return result
    }
    data() {
        return this.weatherData
            .filter((d) => this.type ? d.type === this.type : true)
            .filter((d) => this.place ? d.place === this.place : true)
            .filter((d) => this.period ? this.period.contains(d.time) : true)
    }
}