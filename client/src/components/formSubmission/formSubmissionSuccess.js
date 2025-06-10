import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { connect } from 'react-redux';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './formSubmission.css';
import { setFormSubmissionComplete } from '../../store/actions/formActions';

const FormSubmissionSuccess = (props) => {
  const { authorized, userData, form } = props;
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
        navigate('/dashboard', {
        state: { confirmed: true }
      });
    }
  }, [navigate])

  //Block access from register success component if logged in and attempting to access via url
  var fromForm = false;
  if (props.location.state !== undefined) {
    if (props.location.state.submission === true) {
      fromForm = true;
    }
  }

  if (authorized === true && fromForm === true) {
    props.formSubmissionComplete();

    const message = userData ? (
      form ? (
        //If an organization user, change request submitted message displays, otherwise changes made message displays for RA/root users
        userData.accessLevel === 0 ? (
          <div className="alert alert-dismissible alert-success" style={{ textAlign: "left" }}>
            <h5><strong>Your change request was submitted successfully</strong></h5> Form submission tag number: <strong>{form.tagNumber}</strong>.
          </div>
        ) : (
          <div className="alert alert-dismissible alert-success" style={{ textAlign: "left" }}>
            <h5><strong>Your changes were made successfully</strong></h5> Your changes have been saved and are publicly visible for data visualization.<br></br><br></br> Form submission tag number: <strong>{form.tagNumber}</strong>.
          </div>
        )
      ) : null
    ) : null

    return (
      <div id="dashboard">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-8 m-auto">
              <div className="card card-body text-center">
                {message}
                <Link to='/dashboard'><h5>Back to dashboard</h5></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <redirect to='/' />
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,
    form: state.data.form
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    formSubmissionComplete: () => dispatch(setFormSubmissionComplete())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmissionSuccess)
