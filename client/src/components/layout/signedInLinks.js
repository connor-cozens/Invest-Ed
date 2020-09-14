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
    const {authorized, userData} = this.props;
    if (authorized) {
      const loading = "Loading";

      const register = userData ? (userData.accessLevel == 0 ? null :
        <li className="nav-item">
          <Link to = '/register' className = "nav-link">Register a User</Link>
        </li>
        ):
        loading;
      return (
      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to = '/' className = "nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to = '/about' className = "nav-link">About Us</Link>
          </li>
          <li className="nav-item">
            <Link to = '/visualize' className = "nav-link">Visualization</Link>
          </li>
          <li className="nav-item">
            <Link to = '/dashboard' className = "nav-link">My Dashboard</Link>
          </li>
          {register}
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to = '/contactUs' className = "nav-link" style = {{color: "white"}}>Contact Us</Link>
            </li>
            <li className="nav-item dropdown">
              <a id="dropdownMenuButton" style = {{color: "white"}} className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{userData ? userData.firstname + ' ' + userData.lastname : loading}</a>
              <div aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                <Link to = '/profile' className = "dropdown-item">My Account</Link>
                <div className ="dropdown-divider"></div>
                <Link className = "dropdown-item" onClick = {this.handleLogout}>Sign out</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
