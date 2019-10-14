const { TYPE_TEMPERATURE, TYPE_PRECIPITATION, TYPE_WIND } = require('./WeatherData.js')

const weatherForecast = function (weatherPredictions) {
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
        weatherPredictions.map((wp) => {
            switch (wp.getType()) {
                case TYPE_TEMPERATURE: {
                    wp.convertToF()
                    break
                }
                case TYPE_PRECIPITATION: {
                    wp.convertToInches()
                    break
                }
                case TYPE_WIND: {
                    wp.convertToMPH()
                    break
                }
                default: break
            }
        })
    }
    const convertToInternationalUnits = function () {
        weatherPredictions.map((wp) => {
            switch (wp.getType()) {
                case TYPE_TEMPERATURE: {
                    wp.convertToC()
                    break
                }
                case TYPE_PRECIPITATION: {
                    wp.convertToMM()
                    break
                }
                case TYPE_WIND: {
                    wp.convertToMS()
                    break
                }
                default: break
            }
        })
    }
    const add = function (data) {
        weatherPredictions.push(...data)
    }
    const data = function () {
        return weatherPredictions
            .filter((wp) => currentPlace ? wp.getPlace() === currentPlace : true)
            .filter((wp) => currentType ? wp.getType() === currentType : true)
            .filter((wp) => currentPeriod ? currentPeriod.contains(wp.getTime()) : true)
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

module.exports = weatherForecast