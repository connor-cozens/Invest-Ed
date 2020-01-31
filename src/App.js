import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Register from './components/auth/register';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Register/>
        </div>
    );
  }
}

export default App;
