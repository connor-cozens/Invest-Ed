import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/actions/authActions';

class SignedInLinks extends Component {

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logOut();
  };
  render() {
    return (
      <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
        <div className = "container">
          <Link to = '/dashboard' className = "navbar-brand">My Dashboard</Link>
          <Link className = "navbar-brand" onClick = {this.handleLogout}>Sign out</Link>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
