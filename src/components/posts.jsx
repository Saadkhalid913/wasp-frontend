import React, { Component } from 'react';
import axios from "axios"
import Task from "./post"

export default class Posts extends Component {
  state = {
    posts: [],
    token: false 
  }

  componentDidMount = async () => {
    const posts = await this.GetUserPosts()
    this.setState({ posts })

    // window.addEventListener("keyup", (e) => {
    //   if (e.keyCode === 13) {
    //     e.preventDefault();
    //     document.getElementById("add-task-button").click()
    //   }
    // })
  }
  
  render() {
    if (this.state.posts.length === 0) {
    return (
        <React.Fragment>
          <div className="add-task-wrapper">
              <input placeholder ="Add item" id = "add-task-input"/>
              <button onClick={() => this.handleAdd()} id = "add-task-button">Add post</button>
          </div>
          <div className = "no-posts-wrapper">
              <h2>No items to display!</h2>
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
       <div className = "tasks-wrapper">
       <div className="add-task-wrapper">
              <input placeholder ="Add item" id = "add-task-input"/>
              <button onClick={() => this.handleAdd()} id = "add-task-button">Add post</button>
        </div>
        <div className = "tasks">
        { this.state.posts.map(post => {
        if (!post) return 
        return (<Task
          key={post._id}
          task={post}
          toggleComplete={this.toggleComplete}
          handleDelete={this.handleDelete}/>)})}
      </div>
       </div>
      </React.Fragment>
    );
  }

  GetUserPosts = async () => {
    const token = this.props.token
    const posts = await axios.get("https://wasp-api.herokuapp.com/api/posts/populate", {
      headers: {
        user_auth_token: token
      }
    })

    if (posts.data.error) {
      this.logOut()
      return
    }

    if (!Array.isArray(post.data)) return
    this.setState({token: true})
    return posts.data
  }

  logOut = () => {
      this.setState({token: false})
      localStorage.clear();
      return
  }

  toggleComplete = async (task) => {
    const id = task._id;
    const response = await axios.put("https://wasp-api.herokuapp.com/api/posts/toggle/" + id, {}, {headers:{ user_auth_token:this.props.token}})
    if (response.data.error || response.status !== 200) return alert("There was an error")
    const post = response.data;
    const posts = [...this.state.posts];
    const index = posts.findIndex(p => {
      return p._id === post._id
    })
    posts[index].completed = post.completed
    this.setState({ posts })
  }

  handleAdd = async () => {
    const text = document.getElementById("add-task-input").value;
    if (text.length < 8) return 
    const response = await axios.post("https://wasp-api.herokuapp.com/api/posts/", {user_auth_token:this.props.token, text})
    if (response.data.error) return alert(response.data.error)
    this.addPostToState(response.data)
    document.getElementById("add-task-input").value = ""
  }

  addPostToState = (post) => {
    const posts = [...this.state.posts, post]
    this.setState({ posts })
  }

  handleDelete = async (post) => {
  
    let id = post._id;
    const response = await axios.delete("https://wasp-api.herokuapp.com/api/posts/" + id, {headers : { user_auth_token: this.props.token } })
    id = response.data._id;

    const posts = [...this.state.posts]
    const index = posts.findIndex(p => p._id === id);
    posts.splice(index, 1);
    this.setState({ posts })
  }
}