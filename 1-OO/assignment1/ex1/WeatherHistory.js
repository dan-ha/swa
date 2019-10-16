const { TYPE_TEMPERATURE, TYPE_PRECIPITATION, TYPE_WIND } = require('./WeatherData.js')

const weatherHistory = function (weatherData) {
    let currentPlace = undefined
    let currentType = undefined
    let currentPeriod = undefined

    const getCurrentPlace = function () { return currentPlace }
    const setCurrentPlace = function (newPlace) { currentPlace = newPlace }
    const clearCurrentPlace = function () { currentPlace = undefined }
    const getCurrentType = function () { return currentType }
    const setCurrentType = function (newType) { currentType = newType }
    const clearCurrentType = function () { currentType = undefined }
    const getCurrentPeriod = function () { return currentPeriod }
    const setCurrentPeriod = function (newPeriod) { currentPeriod = newPeriod }
    const clearCurrentPeriod = function () { currentPeriod = undefined }
    const convertToUSUnits = function () {
        weatherData.map((wd) => {
            switch (wd.getType()) {
                case TYPE_TEMPERATURE: {
                    wd.convertToF()
                    break
                }
                case TYPE_PRECIPITATION: {
                    wd.convertToInches()
                    break
                }
                case TYPE_WIND: {
                    wd.convertToMPH()
                    break
                }
                default: break
            }
        })
    }
    const convertToInternationalUnits = function () {
        weatherData.map((wd) => {
            switch (wd.getType()) {
                case TYPE_TEMPERATURE: {
                    wd.convertToC()
                    break
                }
                case TYPE_PRECIPITATION: {
                    wd.convertToMM()
                    break
                }
                case TYPE_WIND: {
                    wd.convertToMS()
                    break
                }
                default: break
            }
        })
    }
    const add = function (data) {
        weatherData.push(...data)
    }
    const data = function () {
        return weatherData
            .filter((wd) => currentPlace ? wd.getPlace() === currentPlace : true)
            .filter((wd) => currentType ? wd.getType() === currentType : true)
            .filter((wd) => currentPeriod ? currentPeriod.contains(wd.getTime()) : true)
    }

    return {
        getCurrentPlace,
        setCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        setCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        setCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        add,
        data
    }
}

module.exports = weatherHistory