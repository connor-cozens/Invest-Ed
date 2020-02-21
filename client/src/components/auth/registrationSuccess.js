import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const RegistrationSuccess = (props) => {
  const {authorized} = props
  if (authorized === false) {
    return <Redirect to='/login' />
  }
  return (
    <div className = "container">
      <div className = "row mt-5">
        <div className = "col-md-8 m-auto">
          <div className = "card card-body text-center">
            <h4>You have successfully registered an organization user.</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
  };
}

export default connect(mapStateToProps)(RegistrationSuccess)
