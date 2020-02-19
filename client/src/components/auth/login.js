import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { DropdownList } from 'react-widgets'
import {connect} from 'react-redux';
import {loginUser, registerUser} from '../../store/actions/authActions';
import './auth.css';

//Component providing login functionality
class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleSubmit = (event) => {
    console.log(this.state)
    event.preventDefault();
    this.props.logIn(this.state);
  };

  render(){
    console.log(this.props.authorized);
    const {authorized} = this.props;

    if (authorized.auth === true){
      return <Redirect to='/login' />
    }

    const errors = [];
    if (authorized.authError){
      authorized.authError.forEach((error) => {
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
                  <input type = "email" id = "email" placeholder = "Email" onChange={this.handleChange}/>
                  <input type = "password" id = "password" placeholder = "Password" onChange={this.handleChange}/>
                  <input type = "submit" value = "Login"/>
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
    authorized: state.auth,
    authError: state.authError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (user) => dispatch(loginUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
