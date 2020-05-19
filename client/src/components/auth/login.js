import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { DropdownList } from 'react-widgets'
import {connect} from 'react-redux';
import {loginUser, clearAuthError} from '../../store/actions/authActions';
import './auth.css';

//Component providing login functionality
class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount = () => {
    this.props.clearAuthError();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.logIn(this.state);
  };

  render(){
    console.log(this.props.authorized);
    const {authorized, authError} = this.props;

    if (authorized === true){
      return <Redirect to='/' />
    }

    const errors = [];
    if (authError){
      authError.forEach((error) => {
        errors.push(
          <div key = {error} className="alert alert-danger alert-dismissible fade show" role={error}>
            {error}
          </div>
        )
      });
    }

    return(
      <div className = "row mt-5">
        <div className = "col-md-3 m-auto">
          <form onSubmit ={this.handleSubmit} className="form-inline">
            <div className = "card card-body text-center">
              <h2>Login</h2>
                <div className = "loginform">
                  <br/>
                  {errors}
                  <input type = "username" id = "username" placeholder = "Username" onChange={this.handleChange} style = {{width: "80%"}}/>
                  <input type = "password" id = "password" placeholder = "Password" onChange={this.handleChange} style = {{width: "80%"}}/>
                  <input type = "submit" value = "Login" style = {{width: "80%"}}/>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.authenticate.auth,
    authError: state.authenticate.authError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (user) => dispatch(loginUser(user)),
    clearAuthError: () => dispatch(clearAuthError())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
