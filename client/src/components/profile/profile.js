import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Image from '../../images/profile.png'

class Profile extends Component {
  render(){
    const {authorized, accessError, userData} = this.props;

    if (authorized !== true) {
      return <Redirect to='/' />
    }

    if (accessError) {
      return (
        <h3>There was an error retrieving your information</h3>
      );
    }

    const userType = userData.accessLevel == 0 ? "Organization user": (userData.accessLevel == 1 ? "Research user": "Root user")

    return(
      <div>
        <div style = {{margin: "auto", height: "500px"}}>
          <h2 style = {{marginTop: "50px"}}>Account Details</h2>
          <div className="card" style={{margin: "0 auto", width: "20rem", marginTop: "50px", borderStyle: "none"}}>
            <img className="card-img-top" src={Image} alt="Card image cap" style = {{margin: "0 auto", width:"200px", height:"200px"}}/>
            <div className="card-body" style = {{margin: "auto"}}>
              <h3 style = {{textAlign: "left"}}class="card-title">{userData.firstname + ' ' + userData.lastname}</h3>
            </div>
          </div>
          <div className="card" style={{margin: "0 auto", width: "20rem"}}>
            <ul className="list-group list-group-flush">
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Username: <b>{userData.username}</b></li>
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Email: <b>{userData.email}</b></li>
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Organization: <b>{userData.organization}</b></li>
              <li style = {{paddingBottom: "15px"}} class="list-group-item">User Type: <b>{userType}</b></li>
            </ul>
            <div className="card-body">
              <a href="#" class="card-link">Edit Account</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation,
    accessError: state.data.accessError
  };
}

export default connect(mapStateToProps, null)(Profile)
