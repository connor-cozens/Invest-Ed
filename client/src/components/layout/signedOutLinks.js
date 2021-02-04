import React  from 'react';
import {Link} from 'react-router-dom';

const SignedOutLinks = () => {
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
          <Link to='/glossary' className="nav-link">Glossary</Link>
        </li>
        <li className="nav-item">
          <Link to = '/visualize' className = "nav-link">Visualization</Link>
        </li>
      </ul>
      <div className="form-inline my-2 my-lg-0">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to = '/contactUs' className = "nav-link" style = {{color: "white"}}>Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link to = '/login' style = {{color: "white"}} className = "nav-link">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignedOutLinks
