import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
  
  state = {error: null, message: null}

  addListeners = function() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("login-submit").click()
        document.getElementById("username-email-box").value = ""
        document.getElementById("password-box").value = ""
      }
    })
  }

  componentDidMount() {
    // this.addListeners();
    if (localStorage.getItem("user_auth_token")) return this.props.submitToken(localStorage.getItem("user_auth_token"))
  }
  render() {
    return (
      <div className = "login-box">
        <p className = "login-error">{this.state.error}</p>
        <p className = "login-message">{this.state.message}</p>
        <div>
        <label>Email or Username</label>
        <input id = "username-email-box" />
        </div>
        <div>
        <label>Password</label>
        <input type = "password" id = "password-box"/>
        </div>

        <button id = "login-submit" onClick = {this.handleLogin}>Login</button>
        <a href = "/signup">Don't have an account? Sign up here.</a>
      </div>

      );
  }

  handleLogin = async () => {
    this.setState({error: null})
    this.setState({message: null})
    const username = document.getElementById("username-email-box").value
    const password = document.getElementById("password-box").value

    if (!username || !password.length > 7) return this.setState({error: "Please provide a valid username and password"})

    const response = await axios.post("https://wasp-api.herokuapp.com/api/users/login", {
        username: username,
        password: password
    }) 


    if (response.data.error)
      this.setState({error: response.data.error})

    localStorage.setItem("user_auth_token", response.data.user_auth_token)
    this.props.submitToken(response.data.user_auth_token)
  }
}