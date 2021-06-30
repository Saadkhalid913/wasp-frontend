import React, { Component } from 'react';
import { MdDelete , MdDone  } from "react-icons/md"

export default class Task extends Component {
  render() {
    return (
      <div className="task">
        <p>{this.props.task.text}</p>
        <button className = "task-complete" onClick = {() => this.props.toggleComplete(this.props.task)}>
      <MdDone/>
        </button>
        <button className = "task-delete" onClick = {() => this.props.handleDelete(this.props.task)}>
        <MdDelete />
        </button>
      </div>
    );
  }
}