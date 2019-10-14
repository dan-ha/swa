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

const weatherPrediction = function (from, to, type, unit, time, place) {

    const getFrom = function () { return from }
    const setFrom = function (newFrom) { from = newFrom }
    const getTo = function () { return to }
    const setTo = function (newTo) { to = newTo }
    const matches = function (weatherData) {
        if (unit !== weatherData.getUnit()) {
            if (unit === UNIT_CELSIUS) {
                weatherData.convertToC()
            }
            if (unit === UNIT_FAHRENHEIT) {
                weatherData.convertToF()
            }
        }
        return from <= weatherData.getValue() && to >= weatherData.getValue()
    }
    return Object.assign({}, dataType(type, unit), event(time, place), { getFrom, setFrom, getTo, setTo, matches })
}

//#region temperaturePrediction
const temperaturePrediction = function (from, to, unit, time, place) {
    const convertToF = function () {
        if (this.getUnit() === UNIT_CELSIUS) {
            this.setUnit(UNIT_FAHRENHEIT)
            this.setFrom(this.getFrom() * 1.8 + 32)
            this.setTo(this.getTo() * 1.8 + 32)
        }
    }
    const convertToC = function () {
        if (this.getUnit() === UNIT_FAHRENHEIT) {
            this.setUnit(UNIT_CELSIUS)
            this.setFrom((this.getFrom() - 32) / 1.8)
            this.setTo((this.getTo() - 32) / 1.8)
        }
    }
    return Object.assign({}, weatherPrediction(from, to, TYPE_TEMPERATURE, unit, time, place), { convertToF, convertToC })
}
//#endregion

//#region precipitationPredicition
const precipitationPredicition = function (types, from, to, unit, time, place) {
    const getTypes = function () { return types }
    const matches = function (weatherData) {
        if (unit !== weatherData.getUnit()) {
            if (unit === UNIT_MILLIMITERS) {
                weatherData.convertToMM()
            }
            if (unit === UNIT_INCHES) {
                weatherData.convertToInches()
            }
        }
        return weatherData.getType() === TYPE_PRECIPITATION
            && types.includes(weatherData.getPrecipitationType())
            && (from <= weatherData.getValue() && to >= weatherData.getValue())
    }
    const convertToInches = function () {
        if (this.getUnit() === UNIT_MILLIMITERS) {
            this.setUnit(UNIT_INCHES)
            this.setFrom(this.getFrom() * 0.03937008)
            this.setTo(this.getTo() * 0.03937008)
        }
    }
    const convertToMM = function () {
        if (this.getUnit() === UNIT_INCHES) {
            this.setUnit(UNIT_MILLIMITERS)
            this.setFrom(this.getFrom() * 25.4)
            this.setTo(this.getTo() * 25.4)
        }
    }
    return Object.assign({}, weatherPrediction(from, to, TYPE_PRECIPITATION, unit, time, place), { getTypes, matches, convertToInches, convertToMM })
}
//#endregion

//#region windPrediction
const windPrediction = function (directions, from, to, unit, time, place) {
    const getDirections = function () { return directions }
    const matches = function (weatherData) {
        if (unit !== weatherData.getUnit()) {
            if (unit === UNIT_MPH) {
                weatherData.convertToMPH()
            }
            if (unit === UNIT_MS) {
                weatherData.convertToMS()
            }
        }
        return weatherData.getType() === TYPE_WIND
            && directions.includes(weatherData.getDirection())
            && (from <= weatherData.getValue() && to >= weatherData.getValue())
    }
    const convertToMPH = function () {
        if (this.getUnit() === UNIT_MS) {
            this.setUnit(UNIT_MPH)
            this.setFrom(this.getFrom() * 2.2369362921)
            this.setTo(this.getTo() * 2.2369362921)
        }
    }
    const convertToMS = function () {
        if (this.getUnit() === UNIT_MPH) {
            this.setUnit(UNIT_MS)
            this.setFrom(this.getFrom() * 0.44704)
            this.setTo(this.getTo() * 0.44704)
        }
    }
    return Object.assign({}, weatherPrediction(from, to, TYPE_WIND, unit, time, place), { getDirections, matches, convertToMPH, convertToMS })
}
//#endregion

//#region cloudCoveragePrediction
const cloudCoveragePrediction = function (from, to, unit, time, place) {
    return Object.assign({}, weatherPrediction(from, to, TYPE_CLOUD_COVERAGE, unit, time, place))
}
//#endregion

exports.weatherPrediction = weatherPrediction
exports.temperaturePrediction = temperaturePrediction
exports.precipitationPredicition = precipitationPredicition
exports.windPrediction = windPrediction
exports.cloudCoveragePrediction = cloudCoveragePrediction

exports.TYPE_TEMPERATURE = TYPE_TEMPERATURE
exports.TYPE_PRECIPITATION = TYPE_PRECIPITATION
exports.TYPE_WIND = TYPE_WIND
exports.TYPE_CLOUD_COVERAGE = TYPE_CLOUD_COVERAGE