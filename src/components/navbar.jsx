import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    const logout = this.props.logout
    const token = this.props.token
    console.log(token);


    if (token) {
      return (
        <div className="navbar">
          <a href ="/">Wasp</a>
          <button className="logout" onClick = {() => {logout()}}>Log out</button>
        </div>
      )}

    return (
      <div className="navbar">
        <a href ="/">Wasp</a>
      </div>)
  }
}