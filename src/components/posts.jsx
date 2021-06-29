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
    return (
      this.state.posts.map(post => (
        <Task
          key={post._id}
          task={post}
          toggleComplete={this.toggleComplete}/>
      ))
    );
  }

  GetUserPosts = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRhNDY5YjU2YTRjMjFkMDA2ZWIzZjUiLCJpYXQiOjE2MjQ5MTc2NTl9.LI0NB48EOdGIRmfTRlHBqkS4BL4OSoctcqGbAFh3-nY"
    const posts = await axios.get("http://localhost:3000/api/posts/populate", {
      headers: {
        user_auth_token: token
      }
    })
    console.log(posts.data)
    return posts.data
  }

  toggleComplete = (task) => {console.log(task.completed)}
}