import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path = '/' component = {Register} />
            <Route exact path = '/Register' component = {Register} />
            <Route exact path = '/welcome' component = {Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
