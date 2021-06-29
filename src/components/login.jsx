import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
  
  state = {error: false}
  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>there was an error</h1>
          <button onClick = { () => this.setState({error:false})}>Go back</button>
        </div>
      )
    }
    return (
      <div className = "login-box">
        <input id = "username-email-box" />
        <input type = "password" id = "password-box"/>
        <button onClick = {this.handleLogin}>Login</button>
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