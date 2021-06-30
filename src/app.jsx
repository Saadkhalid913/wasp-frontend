import React, { Component } from 'react';
import Tasks from './components/posts';
import Login from "./components/login"
import Signup from "./components/signup"
import Navbar from "./components/navbar";

import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

export default class App extends Component {

  state = {
    token: undefined
  }


  render(){
    if (!this.state.token) {
      return (
        <Router>
          <Route path = "/" component = {Navbar}/> 
           <Route path ="/" exact render = {(props) => <Login {...props} key="login-box" submitToken={this.submitToken}/>}/>
           <Route path ="/signup" exact component={Signup}/>
        </Router>
      );
    }
   return (
   <React.Fragment>
     <Navbar /> 
     <Tasks token = {this.state.token}/>
   </React.Fragment>
   )
   ;
  }  

submitToken = (token) => {
  this.setState({ token })
}

logOut = () => {
  localStorage.clear();
  window.location.reload()
  return
}

}