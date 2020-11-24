import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";	
import "./Signup.css";
import axiosRequestFunctions from "../lib/auth-service";


class Signup extends Component {
  state = { username: "", email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props.signup({username, email, password});
    console.log('Signup -> form submit', { username, email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div  className="h50">
        <div className="center-div form-container">
          <h2>Sign Up</h2>

          <form onSubmit={this.handleFormSubmit}  className="center-div form-elements">

            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />

            <input type="submit" value="Signup" />
          </form>
        <div>
          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
      </div>
      </div>
    );
  }
}

export default withAuth(Signup);
