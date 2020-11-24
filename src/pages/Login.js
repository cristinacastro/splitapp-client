import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	

import "./Login.css";


class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({email, password});
    console.log('Login -> form submit', { email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="h50">
        <div className="center-div form-container">
        <h2>Login</h2>

        <form onSubmit={this.handleFormSubmit} className="center-div form-elements">
          
          <label>email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Login" />
        </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
