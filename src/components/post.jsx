import React, { Component } from 'react';

export default class Task extends Component {
  render() {
    return (
      <div className="Task">
        <p>{this.props.task.text}</p>
        <button onClick = {() => this.props.toggleComplete(this.props.task)}>Complete</button>
      </div>
    );
  }
}