import React from 'react'

const DataBody = ({ model }) => (
  <tbody>
    {
      model.weatherData().map(wd => <DataRow {...{ wd }} />)
    }
  </tbody>
)

const DataRow = ({ wd }) => (
  <tr>
    <td>{wd.type}</td>
    <td>{wd.precipitation_type || wd.direction}</td>
    <td>{wd.value}</td>
    <td>{wd.unit}</td>
    <td>{wd.time}</td>
    <td>{wd.place}</td>
  </tr>
)

const Footer = ({ dispatcher }) => (
  <tfoot>
    <tr>
      <td><input placeholder='type'></input></td>
      <td><input placeholder='type meta'></input></td>
      <td><input placeholder='value'></input></td>
      <td><input placeholder='unit'></input></td>
      <td><input placeholder='time'></input></td>
      <td><input placeholder='place'></input></td>
      <td><button onClick={(event) => {
        const tr = event.target.parentElement.parentElement
        const inputs = tr.querySelectorAll('td > input')
        const weatherData = {
          type: inputs[0].value,
          value: inputs[2].value,
          unit: inputs[3].value,
          time: inputs[4].value,
          place: inputs[5].value
        }
        dispatcher()({ type: 'add', weatherData })
      }
      }>Save</button></td>
    </tr>
  </tfoot>
)

const WeatherData = ({ model, dispatcher }) => (
  <div>
    <h3>Weather data</h3>
    <table>
      <thead><tr><td>Type</td><td>Type meta</td><td>Value</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
      <DataBody {...{ model }} />
      <Footer {...{ dispatcher }} />
    </table>
  </div>
)

export default WeatherData