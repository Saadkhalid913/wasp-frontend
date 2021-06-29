import React, { Component } from 'react';
import Tasks from './components/posts';
import Login from "./components/login"
import "./App.css"


export default class App extends Component {

  state = {
    token: undefined
  }


  render(){
    if (!this.state.token) {
      return (
      <Login key = "login-box" submitToken={this.submitToken}/>
      );
    }
   return (<Tasks token = {this.state.token}/>);
  }  

submitToken = (token) => {
  this.setState({ token })
}

}