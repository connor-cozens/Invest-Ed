import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/actions/dataActions';
import WorldIcon from '../images/world.png'

class Landing extends Component{
  componentDidMount(){
      this.props.getUser()
  }

  render() {
    const {authorized, userData, accessError} = this.props;
    const showAuthStatus = authorized ? (accessError ? <h3>There was an error retrieving your information</h3> : (userData ? <h3>You are logged in as {userData.username}</h3>: <h3>Loading</h3>)) : <h3>Log in to view your dashboard</h3>
    return (
      <div>
        <h2 style = {{paddingTop: '50px'}}>Welcome to the Invest-Ed Data Visualization Tool</h2>
        {showAuthStatus}
        <img src = {WorldIcon} height = {400} width = {400} style = {{margin: "100px 0 0 650px"}} />
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
