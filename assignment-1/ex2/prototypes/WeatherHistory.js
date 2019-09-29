function WeatherHistory(data) {
    this.weatherData = data
    this.currentPlace = undefined
    this.currentType = undefined
    this.currentPeriod = undefined
}

WeatherHistory.prototype.clearCurrentPlace = function () { this.currentPlace = undefined }
WeatherHistory.prototype.clearCurrentType = function () { this.currentType = undefined }
WeatherHistory.prototype.clearCurrentPeriod = function () { this.currentPeriod = undefined }
WeatherHistory.prototype.convertToUSUnits = function () {
    this.weatherData.map((wd) => {
        switch (wd.type) {
            case 'temperature': {
                wd.convertToF()
                break
            }
            case 'precipitation': {
                wd.convertToInches()
                break
            }
            case 'wind': {
                wd.convertToMPH()
                break
            }
            default: break
        }
    })
}
WeatherHistory.prototype.convertToInternationalUnits = function () {
    this.weatherData.map((wd) => {
        switch (wd.type) {
            case 'temperature': {
                wd.convertToC()
                break
            }
            case 'precipitation': {
                wd.convertToMM()
                break
            }
            case 'wind': {
                wd.convertToMS()
                break
            }
            default: break
        }
    })
}
WeatherHistory.prototype.add = function (data) {
    this.data.push(...data)
}
WeatherHistory.prototype.data = function () {
    return this.weatherData
        .filter((wd) => this.currentPlace ? wd.place === this.currentPlace : true)
        .filter((wd) => this.currentType ? wd.type === this.currentType : true)
        .filter((wd) => this.currentPeriod ? this.currentPeriod.contains(wd.time) : true)
}

module.exports = WeatherHistory