// The diagram above adds inheritance to Exercise 3. 
// Use concatenative inheritance to implement it

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

const numericValue = function (value, unit) {
    return {
        getValue: function () { return value },
        setValue: function (newValue) { value = newValue },
        getUnit: function () { return unit },
        setUnit: function (newUnit) { unit = newUnit }
    }
}

const data = function (type, time, place) {
    return {
        getType: function () { return type },
        getTime: function () { return time },
        getPlace: function () { return place }
    }
}

const weatherData = function (value, unit, type, time, place) {
    return Object.assign({}, numericValue(value, unit), data(type, time, place))
}

//#region temperature
const temperature = function (value, unit, time, place) {

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
    return Object.assign({}, weatherData(value, unit, TYPE_TEMPERATURE, time, place), { convertToF, convertToC })
}
//#endregion

//#region precipitation
const precipitation = function (precipitationType, value, unit, time, place) {
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
    return Object.assign({}, weatherData(value, unit, time, place), { getPrecipitationType, convertToInches, convertToMM })
}
//#endregion

//#region wind
const wind = function (direction, value, unit, time, place) {
    const getDirection = function () { return direction }
    const convertToMPH = function () {
        if( this.getUnit() === UNIT_MS) {
            this.setUnit(UNIT_MPH)
            this.setValue(this.getValue() * 2.2369362921)
        }
    }
    const convertToMS = function () {
        if( this.getUnit() === UNIT_MPH ) {
            this.setUnit(UNIT_MS)
            this.setValue(this.getValue() * 0.44704)
        }
    }
    return Object.assign({}, weatherData(value, unit, time, place), {getDirection, convertToMPH, convertToMS})
}
//#endregion

//#region cloudCoverage
const cloudCoverage = function(value, unit, time, place) {
    return Object.assign({}, weatherData(value, unit, time, place))
}
//#endregion


// TEST
let mondayTemperature = temperature(18, UNIT_CELSIUS, new Date(), 'Horsens')
console.log(mondayTemperature.getValue())
mondayTemperature.convertToF()
console.log(mondayTemperature.getValue())
mondayTemperature.convertToC()
console.log(mondayTemperature.getValue())

let mondayPrecipitation = precipitation('showers', 70, UNIT_MILLIMITERS, new Date(), 'Horsens')
console.log(mondayPrecipitation.getValue())
mondayPrecipitation.convertToInches()
console.log(mondayPrecipitation.getValue())
mondayPrecipitation.convertToMM()
console.log(mondayPrecipitation.getValue())

let mondayWind = wind('north', 25, UNIT_MS, new Date(), 'Horsens')
console.log(mondayWind.getValue());
mondayWind.convertToMPH()
console.log(mondayWind.getValue())
mondayWind.convertToMS()
console.log(mondayWind.getValue())
