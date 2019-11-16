import React from 'react'
import * as stats from '../weatherStats.js'

const Stat = ({label, value}) => (
  <div>
    <b>{label}</b>: {value}
  </div>
)

const WeatherStats = ({model}) => (
  <div>
    <h3>Weather Stats</h3>
    <Stat {...{label: 'Minimum temperature', value: stats.minTemperature(model.weatherData())}}/>
    <Stat {...{label: 'Maximum temperature', value: stats.maxTemperature(model.weatherData())}}/>
    <Stat {...{label: 'Total Precipitation', value: stats.totalPrecipitaion(model.weatherData())}}/>
    <Stat {...{label: 'Average wind', value: stats.averageWind(model.weatherData())}}/>
    <Stat {...{label: 'Dominant wind direction temperature', value: stats.dominantWindDirection(model.weatherData())}}/>
    <Stat {...{label: 'Average cloud coverage', value: stats.averageCloudCoverage(model.weatherData())}}/>
  </div>
)

export default WeatherStats