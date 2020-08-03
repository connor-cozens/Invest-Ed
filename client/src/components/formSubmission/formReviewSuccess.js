import React, {useEffect} from 'react';
import {useHistory} from 'react-router';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './formSubmission.css';
import {setFormReviewComplete} from '../../store/actions/dataActions';

const FormReviewSuccess = (props) => {
  const {authorized, userData} = props;
  const history = useHistory();

  useEffect(() => {
    window.onpopstate = (e) => {
      history.push('/dashboard')
    }
  }, [history])

  //Block access from register success component if logged in and attempting to access via url
  var fromForm = false;
  if (props.location.state !== undefined){
    if (props.location.state.submission === true){
      fromForm = true;
    }
  }

  if (authorized === true && fromForm === true) {
    props.formReviewComplete();

    const message =
      <div class="alert alert-dismissible alert-success" style = {{textAlign: "left"}}>
        <h5><strong>Your review was submitted successfully</strong></h5> Your review will be visible to organization and research users who view this form.
      </div>

    return (
      <div id = "dashboard">
        <div className = "container">
          <div className = "row mt-5">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body text-center">
                {message}
                <Link to = '/dashboard'><h5>Back to dashboard</h5></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to='/' />
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    formReviewComplete: () => dispatch(setFormReviewComplete())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormReviewSuccess)
