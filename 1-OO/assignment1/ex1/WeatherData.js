const dataType = require('./DataType.js')
const event = require('./Event.js')

const TYPE_TEMPERATURE = 'temperature'
const TYPE_PRECIPITATION = 'precipitation'
const TYPE_WIND = 'wind'
const TYPE_CLOUD_COVERAGE = 'cloudCoverage'

const UNIT_FAHRENHEIT = 'fahrenheit'
const UNIT_CELSIUS = 'celsius'
const UNIT_INCHES = 'in'
const UNIT_MILLIMITERS = 'mm'
const UNIT_MPH = 'mph'
const UNIT_MS = 'ms'

const weatherData = function (type, unit, time, place, value) {
    const getValue = function () { return value }
    const setValue = function (newValue) { value = newValue }
    return Object.assign({},
        dataType(type, unit),
        event(time, place),
        { getValue, setValue }
    )
}

//#region temperature
const temperature = function (unit, time, place, value) {

    const convertToF = function () {
        if (this.getUnit() === UNIT_CELSIUS) {
            this.setUnit(UNIT_FAHRENHEIT)
            this.setValue(this.getValue() * 1.8 + 32)
        }
    }

    const convertToC = function () {
        if (this.getUnit() === UNIT_FAHRENHEIT) {
            this.setUnit(UNIT_CELSIUS)
            this.setValue((this.getValue() - 32) / 1.8)
        }
    }
    return Object.assign({}, weatherData(TYPE_TEMPERATURE, unit, time, place, value), { convertToF, convertToC })
}
//#endregion

//#region precipitation
const precipitation = function (precipitationType, unit, time, place, value) {
    const getPrecipitationType = function () { return precipitationType }
    const convertToInches = function () {
        if (this.getUnit() === UNIT_MILLIMITERS) {
            this.setUnit(UNIT_INCHES)
            this.setValue(this.getValue() * 0.03937008)
        }
    }
    const convertToMM = function () {
        if (this.getUnit() === UNIT_INCHES) {
            this.setUnit(UNIT_MILLIMITERS)
            this.setValue(this.getValue() * 25.4)
        }
    }
    return Object.assign({}, weatherData(TYPE_PRECIPITATION, unit, time, place, value), { getPrecipitationType, convertToInches, convertToMM })
}
//#endregion

//#region wind
const wind = function (direction, unit, time, place, value) {
    const getDirection = function () { return direction }
    const convertToMPH = function () {
        if (this.getUnit() === UNIT_MS) {
            this.setUnit(UNIT_MPH)
            this.setValue(this.getValue() * 2.2369362921)
        }
    }
    const convertToMS = function () {
        if (this.getUnit() === UNIT_MPH) {
            this.setUnit(UNIT_MS)
            this.setValue(this.getValue() * 0.44704)
        }
    }
    return Object.assign({}, weatherData(TYPE_WIND, unit, time, place, value), { getDirection, convertToMPH, convertToMS })
}
//#endregion

//#region cloudCoverage
const cloudCoverage = function (unit, time, place, value) {
    return Object.assign({}, weatherData(TYPE_CLOUD_COVERAGE, unit, time, place, value))
}
//#endregion


exports.weatherData = weatherData
exports.temperature = temperature
exports.precipitation = precipitation
exports.wind = wind
exports.cloudCoverage = cloudCoverage

exports.TYPE_TEMPERATURE = TYPE_TEMPERATURE
exports.TYPE_PRECIPITATION = TYPE_PRECIPITATION
exports.TYPE_WIND = TYPE_WIND
exports.TYPE_CLOUD_COVERAGE = TYPE_CLOUD_COVERAGE

exports.UNIT_CELSIUS = UNIT_CELSIUS
exports.UNIT_FAHRENHEIT = UNIT_FAHRENHEIT
exports.UNIT_MILLIMITERS = UNIT_MILLIMITERS
exports.UNIT_INCHES = UNIT_INCHES
exports.UNIT_MS = UNIT_MS
exports.UNIT_MPH = UNIT_MPH