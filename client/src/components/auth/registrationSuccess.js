import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { redirect } from 'react-router-dom'
import { setRegistrationComplete } from '../../store/actions/userActions';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = (props) => {
  const { authorized } = props;
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
      navigate('/register')
    }
  }, [navigate])

  //Block access from register success component if logged in and attempting to access via url
  var fromRegister = false;
  if (props.location.state !== undefined) {
    if (props.location.state.registration === true) {
      fromRegister = true;
    }
  }

  if (authorized === true && fromRegister === true) {
    props.registrationComplete();
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 m-auto">
            <div className="card card-body text-center">
              <h4>You have successfully registered an organization user.</h4>
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
    authorized: state.authenticate.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    registrationComplete: () => dispatch(setRegistrationComplete())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSuccess)
