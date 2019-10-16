class WeatherForecast {
    constructor(data) {
        this.predictions = data
        this.currentPlace = undefined
        this.currentType = undefined
        this.currentPeriod = undefined
    }

    clearCurrentPlace() {
        this.currentPlace = undefined
    }
    clearCurrentType() {
        this.currentType = undefined
    }
    clearCurrentPeriod() {
        this.currentPeriod = undefined
    }

    convertToUSUnits = function () {
        this.predictions.map((p) => {
            switch (p.type) {
                case 'temperature': {
                    p.convertToF()
                    break
                }
                case 'precipitation': {
                    p.convertToInches()
                    break
                }
                case 'wind': {
                    p.convertToMPH()
                    break
                }
                default: break
            }
        })
    }
    convertToInternationalUnits = function () {
        this.predictions.map((p) => {
            switch (p.type) {
                case 'temperature': {
                    p.convertToC()
                    break
                }
                case 'precipitation': {
                    p.convertToMM()
                    break
                }
                case 'wind': {
                    p.convertToMS()
                    break
                }
                default: break
            }
        })
    }
    add = function (data) {
        this.predictions.push(...data)
    }
    data = function () {
        return this.predictions
            .filter((p) => this.currentPlace ? p.place === this.currentPlace : true)
            .filter((p) => this.currentType ? p.type === this.currentType : true)
            .filter((p) => this.currentPeriod ? this.currentPeriod.contains(p.time) : true)
    }
}

module.exports = WeatherForecast