import React from 'react'

const DataBody = ({ model }) => (
  <tbody>
    {
      model.weatherForecast().map(p => <DataRow {...{ p }} />)
    }
  </tbody>
)

const DataRow = ({ p }) => (
  <tr>
    <td>{p.type}</td>
    <td>{p.precipitation_types || p.directions}</td>
    <td>{p.from + ' - ' + p.to}</td>
    <td>{p.unit}</td>
    <td>{p.time}</td>
    <td>{p.place}</td>
  </tr>
)

const WeatherForecast = ({ model }) => (
  <div>
    <h3>Weather Forecast</h3>
    <table>
      <thead><tr><td>Type</td><td>Type meta</td><td>Value</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
      <DataBody {...{ model }} />
    </table>
  </div>
)

export default WeatherForecast