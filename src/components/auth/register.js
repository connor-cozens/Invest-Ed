import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/authActions';

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
    // if (this.props.authorized == true){
    //   console.log(this.props.authorized);
    // } else {
    //   console.log();
    // }
  };

  render(){
    console.log(this.props.authorized);
    const {authorized} = this.props;

    if (authorized.auth === true){
      return <Redirect to='/welcome' />
    }
    return(
      <div>
        <form onSubmit ={this.handleSubmit}>
          <h2>Register a Research Team Member</h2>
          <div>
            <label htmlFor = "email">Email</label>
            <input type = "email" id = "email" onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor = "password">Password</label>
            <input type = "password" id = "password" onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor = "confirmpassword">Confirm Password</label>
            <input type = "password" id = "confirmpassword" onChange={this.handleChange}/>
          </div>
          <div>
            <button type = "submit">Register</button>
          </div>
        </form>
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
