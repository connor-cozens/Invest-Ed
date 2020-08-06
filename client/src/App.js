import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import Navbar from './components/layout/navbar';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Profile from './components/profile/profile';
import Dashboard from './components/dashboard/dashboard';
import Landing from './components/landing';
import About from './components/aboutUs';
import RegistrationSuccess from './components/auth/registrationSuccess';
import Visualize from './components/visualize/visualize';
import formSubmission from './components/formSubmission/formSubmission';
import FormSubmissionSuccess from './components/formSubmission/formSubmissionSuccess';
import FormReviewSuccess from './components/formSubmission/formReviewSuccess';
import contactUs from './components/contactUs/contactUs';
import formReview from './components/formSubmission/formReview';
import {getUser, clearUserRetrievalError, clearFormRetrievalError} from './store/actions/dataActions';

class App extends Component {
  componentDidMount() {
    //Clear user retrieval errors on reload
    this.props.clearUserRetrievalError();
    //Attempt to re-retreive user data
    this.props.getUser();
  }

  //Only fire when redux state change updates props passed into component
  static getDerivedStateFromProps(props, state){
    props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path = '/' component = {Landing} />
            <Route exact path = '/about' component = {About} />
            <Route exact path = '/visualize' component = {Visualize} />
            <Route exact path = '/register' component = {Register} />
            <Route exact path = '/register-success' component = {RegistrationSuccess} />
            <Route exact path = '/form-submission-success' component = {FormSubmissionSuccess} />
            <Route exact path = '/form-review-success' component = {FormReviewSuccess} />
            <Route exact path = '/dashboard' component = {Dashboard} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/formsubmission' component = {formSubmission} />
            <Route exact path = '/contactUs' component = {contactUs} />
            <Route exact path = '/formReview' component = {formReview} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //State properties that when changed, will rerender app component
    authorized: state.authenticate.auth,    //If auth state changes
    formSubmitted: state.data.formSubmitted,   //If form submitted successfully
    formReviewed: state.data.formReviewed   //If form review submitted successfully
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    clearUserRetrievalError: () => dispatch(clearUserRetrievalError()),
    clearFormRetrievalError: () => dispatch(clearFormRetrievalError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
