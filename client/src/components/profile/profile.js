import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Image from '../../images/profile.png'

class Profile extends Component {
  render(){
    const {authorized} = this.props;

    if (authorized !== true) {
      return <Redirect to='/' />
    }

    const {userData} = this.props;
    const userType = userData.accessLevel == 0 ? "Organization user": (userData ? (userData.accessLevel == 1 ? "Research user": "Root user") : null )

    return(
      <div>
        <div style = {{margin: "auto", height: "500px"}}>
          <h2 style = {{marginTop: "50px"}}>Account Details</h2>
          <div className="card" style={{margin: "0 auto", width: "25rem", marginTop: "25px", borderStyle: "none"}}>
            <img className="card-img-top" src={Image} alt="Card image cap" style = {{margin: "0 auto", marginTop: "25px", width:"200px", height:"200px"}}/>
            <div className="card-body" style = {{margin: "auto"}}>
              <h3 style = {{textAlign: "left"}}class="card-title">{userData ? userData.firstname + ' ' + userData.lastname : null}</h3>
            </div>
          </div>
          <div className="card" style={{margin: "0 auto", width: "25rem"}}>
            <ul className="list-group list-group-flush">
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Username: <b>{userData ? userData.username : null}</b></li>
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Email: <b>{userData ? userData.email: null}</b></li>
              <li style = {{paddingBottom: "15px"}} class="list-group-item">Organization: <b>{userData ? userData.organization: null}</b></li>
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
    userData: state.data.userInformation
  };
}

export default connect(mapStateToProps, null)(Profile)
