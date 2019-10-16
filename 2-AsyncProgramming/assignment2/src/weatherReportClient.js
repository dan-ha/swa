import WeatherHistory from './WeatherHistory.js'
import WeatherForecast from './WeatherForecast.js'

import Temperature from './model/Temperature.js'
import Precipitation from './model/Precipitation.js'
import Wind from './model/Wind.js'
import CloudCoverage from './model/CloudCoverage.js'

import TemperaturePrediction from './model/TemperaturePrediction.js'
import PrecipitationPrediction from './model/PrecipitationPrediction.js'
import WindPrediction from './model/WindPrediction.js'
import CloudCoveragePrediction from './model/CloudCoveragePrediction.js'

import DateInterval from './model/DateInterval.js'

const PLACES = ['Horsens', 'Aarhus', 'Copenhagen']
const TYPES = ['temperature', 'precipitation', 'wind', 'cloudCoverage']

export function XHRWeatherData() {
    const request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/data')
    request.send()
    request.onload = () => {
        // weather history
        const jsonData = JSON.parse(request.responseText)
        let weatherHistory = new WeatherHistory(parseWeatherData(jsonData)).convertToInternationalUnits()
        displayWeatherHistory(weatherHistory)

        // forecast
        request.open('GET', 'http://localhost:8080/forecast')
        request.send()
        request.onload = () => {
            const jsonData = JSON.parse(request.responseText)
            let weatherForecast = new WeatherForecast(parseWeatherPrediction(jsonData))
            displayForecast(weatherForecast)
        }
    }
}

export async function fetchWeatherData() {
    // weather history async/await
    const jsonData = await fetch('http://localhost:8080/data').then(res => res.json())
    let weatherHistory = new WeatherHistory(parseWeatherData(jsonData)).convertToInternationalUnits()
    displayWeatherHistory(weatherHistory)

    // forecast - promise
    fetch('http://localhost:8080/forecast')
        .then(res => res.json())
        .then(jsonData => {
            let weatherForecast = new WeatherForecast(parseWeatherPrediction(jsonData))
            displayForecast(weatherForecast)
        })
}

function genDOMElem(parent, name, text) {
    const elem = document.createElement(name)
    elem.appendChild(document.createTextNode(text))
    parent.appendChild(elem)
}

function displayWeatherHistory(weatherHistory) {
    PLACES.forEach((place) => {
        const parent = document.getElementById(place)
        genDOMElem(parent, 'h3', 'Latest measurements: ')
        TYPES.forEach((type) => {
            genDOMElem(parent, 'p', getLatestMeasurement(weatherHistory, type, place).toString())
        })

        displayStats(weatherHistory, place)
    })

}

function displayStats(weatherHistory, place) {
    const parent = document.getElementById(place)
    genDOMElem(parent, 'h3', 'Statistics for last 5 days')

    genDOMElem(parent, 'h4', 'Minimum temperature: ')
    genDOMElem(parent, 'p', minTmpInLastFiveDays(weatherHistory, place) + 'C')

    genDOMElem(parent, 'h4', 'Maximum temperature: ')
    genDOMElem(parent, 'p', maxTmpForLastFiveDays(weatherHistory, place).value + 'C')

    genDOMElem(parent, 'h4', 'Total precipitation: ')
    genDOMElem(parent, 'p', totalPrecpForLastFiveDays(weatherHistory, place) + 'mm')

    genDOMElem(parent, 'h4', 'Average wind speed: ')
    genDOMElem(parent, 'p', avgWindSpeedForLastFiveDays(weatherHistory, place) + 'ms')

    genDOMElem(parent, 'h4', 'Dominat wind direction: ')
    genDOMElem(parent, 'p', domWindDirectionForLastFiveDays(weatherHistory, place))

    genDOMElem(parent, 'h4', 'Average cloud coverage: ')
    genDOMElem(parent, 'p', avgCloudCoverageForLastFiveDays(weatherHistory, place) + '%')
}

function displayForecast(weatherForecast) {
    PLACES.forEach((place) => {
        const parent = document.getElementById(place)
        genDOMElem(parent, 'h3', 'Weather forecast for next 24h: ')

        const times = getForecastTimes(weatherForecast, place)
        times.forEach(time => {
            genDOMElem(parent, 'h4', time.toLocaleString())
            const predictions = getWeatherPredictions(weatherForecast, place, time)
            predictions.forEach(p => {
                genDOMElem(parent, 'p', p.toString())
            })
        })
    })
}

function getLatestMeasurement(weatherHistory, type, place) {
    return weatherHistory.forType(type).forPlace(place)
        .data()
        .reduce((latest, cur) =>
            cur.time > latest.time ? cur : latest)
}

function getLastXDaysOfMeasurements(weatherHistory, type, place, dayCount) {
    const lastDate = getLatestMeasurement(weatherHistory, type, place).time
    const xDaysBeforeDate = new Date(lastDate.getTime())
    xDaysBeforeDate.setDate(xDaysBeforeDate.getDate() - dayCount)
    const period = new DateInterval(xDaysBeforeDate, lastDate)
    return weatherHistory.forType(type).forPlace(place).forPeriod(period).data()
}

function minTmpInLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'temperature', place, 5)
    return new WeatherHistory(data).lowestValue()
}

function maxTmpForLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'temperature', place, 5)
    return data.reduce((max, cur) => cur.value > max.value ? cur : max)
}
function totalPrecpForLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'precipitation', place, 5)
    return data.reduce((sum, cur) => sum += cur.value, 0)
}
function avgWindSpeedForLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'wind', place, 5)
    return data.reduce((sum, cur) => sum += cur.value, 0) / data.length
}
function domWindDirectionForLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'wind', place, 5)
    let dirFreq = data.reduce((acc, cur) => {
        acc[cur.direction] ? acc[cur.direction]++ : acc[cur.direction] = 1
        return acc
    }, [])
    let domDir = undefined
    let domDirCount = 0
    for (let dir in dirFreq) {
        if (dirFreq[dir] > domDirCount) {
            domDir = dir
            domDirCount = dirFreq[dir]
        }
    }
    return domDir
}
function avgCloudCoverageForLastFiveDays(weatherHistory, place) {
    const data = getLastXDaysOfMeasurements(weatherHistory, 'cloudCoverage', place, 5)
    return data.reduce((sum, cur) => sum += cur.value, 0) / data.length
}

function getForecastTimes(weatherForecast, place) {
    return weatherForecast.forType('temperaturePrediction').forPlace(place).data().map(p => p.time)
}

function getWeatherPredictions(weatherForecast, place, time) {
    return weatherForecast.forPlace(place).forPeriod(new DateInterval(time, time)).data()
}

function parseWeatherData(jsonData) {
    const weatherData = jsonData.map(o => {
        switch (o.type) {
            case 'temperature': return new Temperature(o.value, o.unit, new Date(o.time), o.place)
            case 'precipitation': return new Precipitation(o.precipitation_type, o.value, o.unit, new Date(o.time), o.place)
            case 'wind speed': return new Wind(o.direction, o.value, o.unit, new Date(o.time), o.place)
            case 'cloud coverage': return new CloudCoverage(o.value, o.unit, new Date(o.time), o.place)
        }
    })
    return weatherData
}
function parseWeatherPrediction(jsonData) {
    const weatherPredictions = jsonData.map(o => {
        switch (o.type) {
            case 'temperature': return new TemperaturePrediction(o.from, o.to, o.unit, new Date(o.time), o.place)
            case 'precipitation': return new PrecipitationPrediction(o.precipitation_types, o.from, o.to, o.unit, new Date(o.time), o.place)
            case 'wind speed': return new WindPrediction(o.directions, o.from, o.to, o.unit, new Date(o.time), o.place)
            case 'cloud coverage': return new CloudCoveragePrediction(o.from, o.to, o.unit, new Date(o.time), o.place)
        }
    })
    return weatherPredictions
}
