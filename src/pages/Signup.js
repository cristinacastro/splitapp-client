import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";	
import "./Login.css";
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
      <div  className="h100 log-container" style={{backgroundImage: `url(./../images/gradient.jpg)`}}>
        <div className="center-div form-container">
        <h3 className="align-left ml10 mb10">Sign up</h3>
          <form onSubmit={this.handleFormSubmit}  className="center-div form-elements w100">

            <input type="text" name="username" placeholder="Enter your username" value={username} onChange={this.handleChange} />

            <input type="email" name="email" placeholder="Enter your email" value={email} onChange={this.handleChange} />

            <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.handleChange} />

            <input type="submit" value="Sign up to new account" className="button-input" />
          </form>
        <div className="center-div ">
          <p className="mr10">Already have account?</p>
          <Link to={"/login"} className="account-link"> Login</Link>
        </div>
      </div>
      </div>
    );
  }
}

export default withAuth(Signup);
