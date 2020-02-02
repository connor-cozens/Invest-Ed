import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class dashboard extends Component {
  render() {
    const {authorized} = this.props;
    if (authorized.auth === false){
      return <Redirect to='/register' />
    }
    return (
      <div className = "container">
        <div className = "row mt-5">
          <div className = "col-md-8 m-auto">
            <div className = "card card-body text-center">
              <h4>You have successfully registered a research team member. Welcome to your dashboard </h4>
            </div>
          </div>
        </div>
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
