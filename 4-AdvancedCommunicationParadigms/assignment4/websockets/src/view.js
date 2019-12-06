import React from 'react'

const SeveritySelector = ({ dispatcher }) => (
  <div>
    <label>Severity:</label>
    <select onChange={(event) => {
      dispatcher()({type: 'severity', severity: event.target.value })
    }}>
      <option value=''>Choose severity</option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
    </select>
  </div>
)

const Subscribe = ({ dispatcher }) => (
  <button onClick={()=>dispatcher()({type:'subscribe'})}>Subscribe</button>
)
const Unsubscribe = ({ dispatcher }) => (
  <button onClick={()=>dispatcher()({type:'unsubscribe'})}>Unsubscribe</button>
)

const WarningList = ({ model }) => (
  <div>
    <h1>Weather Warnings</h1>
    <ul>
      {model.getWarnings().map(warning => <Warning key={warning.id.toString()} {...{ warning }} />)}
    </ul>
  </div>
)

const Warning = ({ warning }) => (
  <li>Id: {warning.id}, Severity: {warning.severity}, Prediction: {JSON.stringify(warning.prediction)}</li>
)

const UpdateList = ({ model }) => (
  <div>
    <h1>Changes in warnings</h1>
    <ul>
      {model.getUpdates().map(update => <Update key={update.id.toString()} {...{ update }} />)}
    </ul>
  </div>
)

const Update = ({ update }) => (
  <li>Id: {update.id}, Severity: {update.severity}, Prediction: {JSON.stringify(update.prediction)}</li>
)

const view = (dispatcher) => model => (
  <div>
    <SeveritySelector {...{ dispatcher }}/>
    <Subscribe {...{ dispatcher }}/>
    <Unsubscribe {...{ dispatcher }}/>
    <WarningList {...{ model }} />
    <UpdateList {...{ model }} />
  </div>
)

export default view