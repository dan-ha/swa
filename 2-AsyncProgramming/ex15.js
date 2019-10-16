// Exercise 15
// Rewrite the classes from ex 7

// Immutable concatenative inheritance - mixin style
// the idea here is to create 'state' state :D
function NumericValue({value, unit}) {
    function getValue() { return value }
    function getUnit() { return unit }
    return { getValue, getUnit }
}

function Data({type, time, place}) {
    function getType() { return type }
    function getTime() { return time }
    function getPlace() { return place }
    return { getType, getTime, getPlace }
}

function WeatherData(state) {
    let nv = NumericValue(state)
    let d = Data(state)
    return { ...nv, ...d }
}

function Temperature(state) {
    function convertToF() {
        if(state.unit === 'c') {
            let newValue = state.value * 9 / 5 + 32
            return create_temperature(newValue, 'f', state.time, state.place)
        } else {
            return this
        }
    }
    function convertToC() {
        if(state.unit === 'f') {
            let newValue = (state.value - 32) * 5 / 9
            return create_temperature(newValue, 'c', state.time, state.place)
        } else {
            return this
        }
    }
    return { convertToF, convertToC }
}

function create_temperature(value, unit, time, place){
    let state = { value, unit, type: 'temperature', time, place }
    return {...Temperature(state), ...WeatherData(state)}
}

// a immutable classes - not truly immutable due to this.<param> within a class
class NumericValueClass {
    constructor(value, unit) {
        this.value = value
        this.unit = unit
    }
    getValue() { return value }
    getUnit() { return unit }
}

class DataClass {
    constructor(type, time, place) {
        this.type = type
        this.time = time
        this.place = place
    }
    getType() { return type }
    getTime() { return time }
    getPlace() { return place }
}

class WeatherDataClass extends NumericValueClass {
    constructor(value, unit, data) {
        super( value, unit )
        this.data = data
    }
}

class TemperatureClass extends WeatherDataClass {
    constructor(value, unit, time, location) {
        super(value, unit, new DataClass('temperature', time, location))
    }
    convertToF() {
        if(this.unit === 'c'){
            let newValue = this.value * 9 / 5 + 32
            return new TemperatureClass(newValue, 'f', this.type, this.time, this.location)
        } else {
            return this
        }
    }
    convertToC() {
        if(this.unit === 'f') {
            let newValue = (this.value - 32) * 5 / 9
            return new TemperatureClass(newValue, 'c', this.type, this.time, this.location)
        } else {
            return this
        }
    }
}

// b functions+data
