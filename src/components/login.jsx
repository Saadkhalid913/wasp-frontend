import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
  
  state = {error: null}
  render() {
    return (
      <div className = "login-box">
        <p className = "login-error">{this.state.error}</p>
        <div>
        <label>Email or Username</label>
        <input id = "username-email-box" />
        </div>
        <div>
        <label>Password</label>
        <input type = "password" id = "password-box"/>
        </div>

        <button onClick = {this.handleLogin}>Login</button>
        <a href = "/signup">Don't have an account? Sign up here.</a>
      </div>

      );
  }

  handleLogin = async () => {
    const username = document.getElementById("username-email-box").value
    const password = document.getElementById("password-box").value

    const response = await axios.post("http://localhost:3000/api/users/login", {
        username: username,
        password: password
    }) 

    if (response.data.error)
      this.setState({error: true})

    this.props.submitToken(response.data.user_auth_token)
  }
}