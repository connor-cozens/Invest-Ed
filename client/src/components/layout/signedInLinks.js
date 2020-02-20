import React from 'react';
import {Link} from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
      <div className = "container">
        <Link to = '/welcome' className = "navbar-brand">My Dashboard</Link>
        <Link to = '/' className = "navbar-brand">Sign out</Link>
      </div>
    </nav>
  )
}

export default SignedInLinks
