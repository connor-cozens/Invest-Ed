import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/authActions';
import './auth.css';

//Component providing registration functionality for admin to register user
class Register extends Component {
  state = {
    email: '',
    password: '',
    confirmpassword: ''
  }

  // componentDidUpdate = () => {
  //   this.props.signUp(this.state);
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUp(this.state);
  };

  render(){
    console.log(this.props.authorized);
    const {authorized} = this.props;

    if (authorized.auth === true){
      return <Redirect to='/welcome' />
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
      <div className = "container">
        <div className = "row mt-5">
          <div className = "col-md-6 m-auto">
            <div className = "card card-body text-center">
              <form onSubmit ={this.handleSubmit}>
                <h2>Research Member Registration</h2>
                  <div className = "registerform">
                    <br/>
                    {errors}
                    <input type = "email" id = "email" placeholder = "Enter researcher email" onChange={this.handleChange}/>
                    <input type = "username" id = "username" placeholder = "Enter username"/>
                    <input type = "password" id = "password" placeholder = "Enter password" onChange={this.handleChange}/>
                    <input type = "password" id = "confirmpassword" placeholder = "Confirm password" onChange={this.handleChange}/>
                    <input type = "submit" value = "Register"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
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
    signUp: (user) => dispatch(registerUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
