import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/actions/dataActions';

class Landing extends Component{
  componentDidMount(){
      this.props.getUser()
  }

  render() {
    const {authorized, userData, accessError} = this.props;
    const showAuthStatus = authorized ? (accessError ? <h3>There was an error retrieving your information</h3> : (userData ? <h3>You are logged in. Welcome {userData.username}</h3>: <h3>Loading</h3>)) : <h3>You are NOT logged in</h3>
    return (
      <div>
        <h2 style = {{paddingTop: '50px'}}>Landing Page</h2>
        {showAuthStatus}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,
    accessError: state.data.accessError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
