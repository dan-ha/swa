import React from 'react'
import WeatherStats from './components/WeatherStats.js'
import WeatherData from './components/WeatherData.js'
import WeatherForecast from './components/WeatherForecast.js'

const PlaceSelector = ({ dispatcher }) => (
  <div>
    <label>Place:</label>
    <select onChange={(event) => {
      dispatcher()({ type: 'place', place: event.target.value })
    }}>
      <option value=''>All</option>
      <option value='Horsens'>Horsens</option>
      <option value='Aarhus'>Aarhus</option>
      <option value='Copenhagen'>Copenhagen</option>
    </select>
  </div>
)

const PeriodSelector = ({ dispatcher }) => (
  <div onChange={(event) => {
    let periodSelector = event.target.parentElement.parentElement
    let inputs = periodSelector.querySelectorAll('span > input')

    let from = `${inputs[0].value} ${inputs[1].value}`
    let to = `${inputs[2].value} ${inputs[3].value}`
    if (from.length > 11 && to.length > 11) {
      dispatcher()({ type: 'period', from, to })
    }
  }}>
    <DateTimeSelector {...{ label: 'From' }} />
    <DateTimeSelector {...{ label: 'To' }} />
  </div>
)

const DateTimeSelector = ({ label }) => (
  <span onChange={(event) => {
    if (!event.target.value) {
      event.preventDefault()
    }
  }}>
    <label>{label}</label>
    <input type="date"></input>
    <input type="time"></input>
  </span>
)

const RefreshButton = ({ dispatcher }) => (
  <button onClick={() => dispatcher()({ type: 'refresh' })}>Refresh</button>
)

const view = (dispatcher) => model => (
  <div id='base'>
    <h1>Weather report</h1>
    <PlaceSelector {...{ dispatcher }} />
    <PeriodSelector {...{ dispatcher }} />
    <RefreshButton {...{ dispatcher }} />

    <WeatherStats {...{model}}/>
    <WeatherData {...{ model, dispatcher }} />
    <WeatherForecast {...{ model }} />
  </div>
)

export default view