import React from 'react';
import SignedOutLinks from './signedOutLinks';
import SignedInLinks from './signedInLinks';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
  const {authorized} = props;
  const linksToShow = authorized ? <SignedInLinks/> : <SignedOutLinks/>;
  return (
    <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand"><b>Invest-Ed Data Visualization Tool</b></a>
      {linksToShow}
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth
  }
}

export default connect(mapStateToProps)(Navbar)
