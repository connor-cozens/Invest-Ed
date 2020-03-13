import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { DropdownList } from 'react-widgets'
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/dataActions';
import './auth.css';

//Component providing registration functionality for admin to register user
class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    organization: '',
    accesslevel: '',
    password: '',
    confirmpassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.accesslevel == 'organization'){
      this.state.accesslevel = 0
    } else if (this.state.accesslevel == 'research'){
      this.state.accesslevel = 1
    }
    this.props.signUp(this.state);
  };

  render(){
    console.log(this.props.authorized);
    const {authorized, registered, registerError} = this.props;
    if (authorized !== true){
      return <Redirect to='/' />
    }

    if (registered === true){
      return <Redirect to=
        {{
          pathname: '/register-success',
          state: {registration: true}
        }} />
    }

    const {userData} = this.props;
    //If research user, only allow option to register organization user. If root user, can register both organization and research users
    const selectOptions = userData.accessLevel == 1 ?
            <select type="accesslevel" id="accesslevel" name="accesslevel" onChange={this.handleChange}>
              <option value="Select" selected = "selected">Select a user access type*</option>
              <option value="organization">Organization user</option>
            </select> :
            <select type="accesslevel" id="accesslevel" name="accesslevel" onChange={this.handleChange}>
              <option value="Select" selected = "selected">Select a user access type*</option>
              <option value="research">Research user</option>
              <option value="organization">Organization user</option>
            </select>

    const errors = [];
    if (registerError !== null){
      registerError.forEach((error) => {
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
                    <input type = "firstname" id = "firstname" placeholder = "Enter first name*" onChange={this.handleChange}/>
                    <input type = "lastname" id = "lastname" placeholder = "Enter last name*" onChange={this.handleChange}/>
                    <input type = "email" id = "email" placeholder = "Enter email*" onChange={this.handleChange}/>
                    <input type = "username" id = "username" placeholder = "Enter username*" onChange={this.handleChange}/>
                    {selectOptions}
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
    registered: state.data.registered,
    userData: state.data.userInformation,
    registerError: state.data.registerError,
    authorized: state.authenticate.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(registerUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
