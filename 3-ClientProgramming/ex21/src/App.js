import React from 'react';
import { useState } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'user'
    }
  }
  handleNewName = (newName) => {
    this.setState({ name: newName })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WelcomeMessage name={this.state.name} />
          <NameInput onClick={this.handleNewName} />
        </header>
      </div>
    );
  }
}

function NameInput({ onClick }) {
  const [input, setInput] = useState('');
  return (
    <div>
      <h3>Whats your name?</h3>
      <input 
        value={input}
        onInput={e => setInput(e.target.value)}
      ></input>
      <button
        onClick={() => onClick(input)}
      >
        Submit
      </button>
    </div>
  )
}

function WelcomeMessage({ name }) {
  return (
    <h1>Dear {name}, welcome in SWA1</h1>
  )
}

export default App;
