import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { connect } from 'react-redux';
import Navbar from './components/layout/navbar';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Profile from './components/profile/profile';
import Dashboard from './components/dashboard/dashboard';
import Landing from './components/landing/landing';
import About from './components/about/about';
import RegistrationSuccess from './components/auth/registrationSuccess';
import Visualize from './components/visualize/visualize';
import FormSubmission from './components/formSubmission/formSubmission';
import FormSubmissionSuccess from './components/formSubmission/formSubmissionSuccess';
import FormReviewSuccess from './components/formSubmission/formReviewSuccess';
import ContactUs from "./components/contactUs/contactUs";
import FormReview from './components/formSubmission/formReview';
import { clearFormRetrievalError } from './store/actions/formActions';
import { getUser, clearUserRetrievalError } from './store/actions/userActions';

class App extends Component {
  componentDidMount() {
    //Clear user retrieval errors on reload
    this.props.clearUserRetrievalError();
    //Attempt to re-retrieve user data
    this.props.getUser();
  }

  //Only fire when redux state change updates props passed into component
  static getDerivedStateFromProps(props, state) {
    props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/visualize" element={<Visualize />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-success" element={<RegistrationSuccess />} />
            <Route path="/form-submission-success" element={<FormSubmissionSuccess />} />
            <Route path="/form-review-success" element={<FormReviewSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/formsubmission" element={<FormSubmission />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/formReview" element={<FormReview />} />
          </Routes>
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
    formSubmitError: state.data.formSubmitError,  //If error occured on form submit
    formReviewError: state.data.formReviewError,  //If error occured on form review submission
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
