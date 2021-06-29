import React, { Component } from 'react';
import Tasks from './components/posts';
import Login from "./components/login"
import Signup from "./components/signup"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default class App extends Component {

  state = {
    token: undefined
  }


  render(){
    console.log("current token", this.state.token)
    if (!this.state.token) {
      return (
        <Router>
           <Route path ="/" exact render = {(props) => <Login {...props} key="login-box" submitToken={this.submitToken}/>}/>
           <Route path ="/signup" exact component={Signup}/>
        </Router>
      );
    }
   return (<Tasks token = {this.state.token}/>);
  }  

submitToken = (token) => {
  this.setState({ token })
}

}