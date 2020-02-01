import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import formSubmission from './components/formSubmission/formSubmission';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path = '/' component = {Register} />
            <Route exact path = '/register' component = {Register} />
            <Route exact path = '/welcome' component = {Dashboard} />
            <Route exact path = '/formsubmission' component = {formSubmission} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
