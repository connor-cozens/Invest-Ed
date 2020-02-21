import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { DropdownList } from 'react-widgets'
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/authActions';
import './auth.css';

//Component providing registration functionality for admin to register user
class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    accesslevel: '',
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
    const {authorized, authError} = this.props;

    if (authorized === true){
      return <Redirect to='/register-success' />
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
      <div className = "container">
        <div className = "row mt-5">
          <form onSubmit ={this.handleSubmit} className="form-inline">
            <div className = "col-md-8 m-auto">
              <div className = "card card-body text-center">
                <h2>Registration Portal</h2>
                  <div className = "registerform">
                    <br/>
                    {errors}
                    <input className = "col-md-5" type = "firstname" id = "firstname" placeholder = "Enter first name*" onChange={this.handleChange}/>
                    <input className = "col-md-5" style = {{marginLeft:'70px'}} type = "lastname" id = "lastname" placeholder = "Enter last name*" onChange={this.handleChange}/>
                    <input type = "email" id = "email" placeholder = "Enter email*" onChange={this.handleChange}/>
                    <select type="accesslevel" id="accesslevel" name="accesslevel" onChange={this.handleChange}>
                      <option value="Select" selected = "selected">Select a user access type*</option>
                      <option value="research">Research user</option>
                      <option value="organization">Organization user</option>
                    </select>
                    <input type = "organization" id = "organization" placeholder = "Enter organization name" onChange={this.handleChange}/>
                    <br/><br/>
                    <input type = "password" id = "password" placeholder = "Enter password*" onChange={this.handleChange}/>
                    <input type = "password" id = "confirmpassword" placeholder = "Confirm password*" onChange={this.handleChange}/>
                    <input type = "submit" value = "Register"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
    )
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
    signUp: (user) => dispatch(registerUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
