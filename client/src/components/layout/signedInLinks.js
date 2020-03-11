import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/actions/authActions';
import {getUser} from '../../store/actions/dataActions';

class SignedInLinks extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logOut();
  };
  render() {
    const {authorized} = this.props;
    if (authorized) {
      const {userData} = this.props;
      const loading = "Loading"
      return (
        <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
          <div className = "container">
            <Link to = '/dashboard' className = "navbar-brand">My Dashboard</Link>
            <Link to = '/register' className = "navbar-brand">Register a User</Link>
            <Link to = '/profile' className = "navbar-brand">{userData ? userData.email : loading}</Link>
            <Link className = "navbar-brand" onClick = {this.handleLogout}>Sign out</Link>
          </div>
        </nav>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    userData: state.data.userInformation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
