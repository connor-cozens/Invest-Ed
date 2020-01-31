import React, { Component } from 'react'
import axios from 'axios'

//Component providing registration functionality for admin to register user
class Register extends Component {
  state = {
    email: '',
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
    axios.post(`http://localhost:4000/register`, {email: this.state.email, password: this.state.password, confirmpassword: this.state.confirmpassword})
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err)
      })
  };

  render(){
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

export default Register
