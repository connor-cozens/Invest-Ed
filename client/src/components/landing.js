import React from 'react'
import {connect} from 'react-redux'

const Landing = (props) => {
  const {authorized} = props;
  const showAuthStatus = authorized ? <h3>You are logged in</h3> : <h3>You are NOT logged in</h3>
  return (
    <div>
      <h2 style = {{paddingTop: '50px'}}>Landing Page</h2>
      {showAuthStatus}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth
  }
}

export default connect(mapStateToProps)(Landing)
