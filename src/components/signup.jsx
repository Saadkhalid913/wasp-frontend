import axios from 'axios';
import React, { Component } from 'react';

export default class Signup extends Component {
  state = {
    error: null,
    message: null
  }

  render() {
    return (
      <div className = "signup-box">
        <p >{this.state.error}</p>
        <a href = "/" style={{color: "green"}}>{this.state.message}</a>
        <div>
          <label htmlFor = "username">Username</label>
          <input type="text" name = "username" id = "username-box" />
        </div>

        <div>
          <label htmlFor = "email">Email Address</label>
          <input type="email" name = "email" id = "email-box" />
        </div>

        <div>
          <label htmlFor = "password1">{`Password (at least 8 characters)`}</label>
          <input name = "password1" id = "password-box1" />
        </div>

        <div>
          <label htmlFor = "password2">Re-enter password</label>
          <input name = "password2" id = "password-box2" />
        </div>
        
        <button onClick ={this.handleSubmit}>Submit</button>
      </div>
    )
  }

  handleSubmit = async () => {
    this.setState({error: null})
    this.setState({message: null})

    const email = document.getElementById("email-box").value
    const username = document.getElementById("username-box").value
    const pass1 = document.getElementById("password-box1").value
    const pass2 = document.getElementById("password-box2").value

    if (!(pass1===pass2)) return this.setState({error: "The two passwords do not match"})
    
    const response = await axios.post("https://wasp-api.herokuapp.com/api/users/signup", { email, username, password: pass1 })

    if (response.data.error) return this.setState({error: response.data.error});

    if (response.data.user_auth_token) {
      document.getElementById("email-box").value = ""
      document.getElementById("username-box").value = ""
      document.getElementById("password-box1").value = ""
      document.getElementById("password-box2").value = ""
        
      return this.setState({message: "Account created successfully! Click here to log in"})

    }
    
  }

}