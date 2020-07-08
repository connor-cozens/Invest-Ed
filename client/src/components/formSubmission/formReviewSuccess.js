import React, {useEffect} from 'react';
import {useHistory} from 'react-router';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
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

    //If an organization user
    const message = userData ?
      <h4>Your review was submitted successfully</h4> : null
    return (
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
