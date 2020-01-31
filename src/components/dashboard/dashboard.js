import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class dashboard extends Component {
  render() {
    const {authorized} = this.props;
    if (authorized.auth === false){
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1> You have successfully registered a team member. Welcome to your dashboard </h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.auth,
    authError: state.authError
  };
}

export default connect(mapStateToProps)(dashboard)
