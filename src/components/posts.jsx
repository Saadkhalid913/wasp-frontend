import React, { Component } from 'react';
import axios from "axios"
import Task from "./post"

export default class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount = async () => {
    const posts = await this.GetUserPosts()
    this.setState({ posts })
  }
  
  render() {
    console.log(this.state)

    if (this.state.posts.length === 0) {
      return (
        <React.Fragment>
          <div className="add-task-wrapper">
              <input placeholder ="Add item" id = "add-task-input"/>
              <button onClick={() => this.handleAdd()} id = "add-task-button">Add post</button>
          </div>
          <div className = "no-posts-wrapper">
              <h2>There are no posts!</h2>
          </div>
        </React.Fragment>


      )
    }
    return (
      <React.Fragment>
        <div className="add-task-wrapper">
              <input placeholder ="Add item" id = "add-task-input"/>
              <button onClick={() => this.handleAdd()} id = "add-task-button">Add post</button>
        </div>
        <div className = "tasks">
        { this.state.posts.map(post => (

        <Task
          key={post._id}
          task={post}
          toggleComplete={this.toggleComplete}
          handleDelete={this.handleDelete}/>
      ))}
      </div>
      </React.Fragment>
    );
  }

  GetUserPosts = async () => {
    const token = this.props.token
    const posts = await axios.get("http://localhost:3000/api/posts/populate", {
      headers: {
        user_auth_token: token
      }
    })
    return posts.data
  }

  toggleComplete = async (task) => {
    const id = task._id;
    const response = await axios.put("http://localhost:3000/api/posts/toggle/" + id, {}, {headers:{ user_auth_token:this.props.token}})
    console.log(response.data)
  }

  handleAdd = async () => {
    console.log("Handling add")
    const text = document.getElementById("add-task-input").value;
    if (text.length < 8) return 
    const response = await axios.post("http://localhost:3000/api/posts/", {user_auth_token:this.props.token, text})
    if (response.error) return alert(response.error)
    this.addPostToState(response.data)
  }

  addPostToState = (post) => {
    const posts = [...this.state.posts, post]
    this.setState({ posts })
  }

  handleDelete = async (post) => {
  
    let id = post._id;
    const response = await axios.delete("http://localhost:3000/api/posts/" + id, {headers : { user_auth_token: this.props.token } })
    id = response.data._id;

    const posts = [...this.state.posts]
    console.log(posts)
    const index = posts.findIndex(p => p._id === id);
    posts.splice(index, 1);
    this.setState({ posts })
  }
}