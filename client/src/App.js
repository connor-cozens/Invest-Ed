import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import Landing from './components/landing';
import formSubmission from './components/formSubmission/formSubmission';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path = '/' component = {Landing} />
            <Route exact path = '/register' component = {Register} />
            <Route exact path = '/welcome' component = {Dashboard} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/formsubmission' component = {formSubmission} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
