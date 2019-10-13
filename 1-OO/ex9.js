// Exercise 9
/* Implement the diagram from exercise 9 with class keyword,
* you need to redisgn in order to deal with multiple inheritance. Don't need to encapsulate
*/

class TextValue {
    constructor(value) {
        this.value = value
    }
    getValue() { return value }
}

class NumericValue {
    constructor(value, unit) {
        this.value = value
        this.unit = unit
    }
    getValue() { return this.value }
    setValue(newValue) { this.value = newValue }
    getUnit() { return this.unit }
    setUnit(newUnit) { this.unit = newUnit }
}

class Data {
    constructor(type, time, place) {
        this.type = type
        this.time = time
        this.place = place
    }
    getType() { return this.type }
    getTime() { return this.time }
    getPlace() { return this.place }
}

class WeatherData extends Data {
    constructor(numericValue, type, time, place) {
        super(type, time, place)
        this.numericValue = numericValue
    }
    getValue() { return this.numericValue.getValue() }
    setValue(newValue) { this.numericValue.setValue(newValue) }
    getUnit() { return this.numericValue.getUnit() }
    setUnit(newUnit) { this.numericValue.setUnit(newUnit)}
}

class Temperature extends WeatherData {
    constructor(numericValue, time, place) {
        super(numericValue, 'temperature', time, place)
    }
    convertToF() {
        if (this.getUnit() == 'c') {
            this.setUnit('f')
            this.setValue(this.getValue() * 1.8 + 32)
        }
    }
    convertToC() {
        if (this.getUnit() == 'f') {
            this.setUnit('c')
            this.setValue((this.getValue() - 32) / 1.8)
        }
    }
}

class Precipitation extends WeatherData {
    constructor(numericValue, precipitationType, time, place) {
        super(numericValue, 'precipitation', time, place)
        this.precipitationType = precipitationType
    }
    getPrecipitationType() { return this.precipitationType }
    convertToInches() {
        if (this.getUnit() == 'mm') {
            this.setUnit('in')
            this.setValue(this.getValue() * 0.03937008)
        }
    }
    convertToMM() {
        if (this.getUnit() == 'in') {
            this.setUnit('mm')
            this.setValue(this.getValue() * 25.4)
        }
    }
}

class Wind extends WeatherData {
    constructor(numericValue, direction, time, place) {
        super(numericValue, 'widn', time, place)
        this.direction = direction
    }
    getDirection() { return direction }
    convertToMPH() {
        if (this.getUnit() == 'ms') {
            this.setUnit('mph')
            this.setValue(this.getValue() * 2.2369362921)
        }
    }
    convertToMS() {
        if (this.getUnit() == 'mph') {
            this.setUnit('ms')
            this.setValue(this.getValue() * 0.44704)
        }
    }
}

class CloudCoverage extends WeatherData {
    constructor(numericValue, time, place) {
        super(numericValue, 'cloudCoverage', time, place)
    }
}

// TEST
let mondayTemperature = new Temperature(new NumericValue(18, 'c'), new Date(), 'Horsens')
console.log(mondayTemperature.getValue())
mondayTemperature.convertToF()
console.log(mondayTemperature.getValue())
mondayTemperature.convertToC()
console.log(mondayTemperature.getValue())

let mondayPrecipitation = new Precipitation(new NumericValue(70, 'mm'), 'showers', new Date(), 'Horsens')
console.log(mondayPrecipitation.getValue())
mondayPrecipitation.convertToInches()
console.log(mondayPrecipitation.getValue())
mondayPrecipitation.convertToMM()
console.log(mondayPrecipitation.getValue())

let mondayWind = new Wind(new NumericValue(25, 'ms'), 'north', new Date(), 'Horsens')
console.log(mondayWind.getValue());
mondayWind.convertToMPH()
console.log(mondayWind.getValue())
mondayWind.convertToMS()
console.log(mondayWind.getValue())