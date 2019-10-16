export default class WeatherForecast {
    constructor(weatherPredictions, { place, type, period } = {}) {
        this.weatherPredictions = weatherPredictions
        this.place = place
        this.type = type
        this.period = period
    }

    forType(type) { return new WeatherForecast(this.weatherPredictions, { type, place: this.place, period: this.period }) }
    forPlace(place) { return new WeatherForecast(this.weatherPredictions, { type: this.type, place, period: this.period }) }
    forPeriod(period) { return new WeatherForecast(this.weatherPredictions, { type: this.type, place: this.place, period }) }
    including(data) { return new WeatherForecast([...this.weatherPredictions, ...data], { type: this.type, place: this.place, period: this.period }) }

    convertToUsUnits() {
        const weatherPredictionsUs = this.weatherPredictions.map((p) => {
            switch (p.type) {
                case 'temperaturePrediction': return p.convertToF()
                case 'precipitationPrediction': return p.convertToInches()
                case 'windPrediction': return p.convertToMPH()
                case 'cloudCoveragePrediction': return p
                default: return p
            }
        })
        return new WeatherForecast(weatherPredictionsUs, { type: this.type, place: this.place, period: this.period })

    }
    convertToInternationalUnits() {
        const weatherPredictionsInt = this.weatherPredictions.map((p) => {
            switch (p.type) {
                case 'temperaturePrediction': return p.convertToC()
                case 'precipitationPrediction': return p.convertToMM()
                case 'windPrediction': return p.convertToMS()
                case 'cloudCoveragePrediction': return p
                default: return p
            }
        })
        return new WeatherForecast(weatherPredictionsInt, { type: this.type, place: this.place, period: this.period })
    }
    averageFromValue() {
        const filteredData = this.data()
        return filteredData.reduce((acc, cur) => acc += cur.from, 0) / filteredData.length
    }
    averageToValue() {
        const filteredData = this.data()
        return filteredData.reduce((acc, cur) => acc += cur.to, 0) / filteredData.length
    }
    data() {
        return this.weatherPredictions
            .filter((p) => this.type ? p.type === this.type : true)
            .filter((p) => this.place ? p.place === this.place : true)
            .filter((p) => this.period ? this.period.contains(p.time) : true)
    }
}