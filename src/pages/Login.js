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
      <div className="h100 log-container" style={{backgroundImage: `url(./../images/gradient.jpg)`}}>
        <div className="center-div form-container">
          <h3 className="align-left ml10 mb10">Log in</h3>

        <form onSubmit={this.handleFormSubmit} className="center-div form-elements w100">
          
          <input type="text" name="email" placeholder="Enter your email" value={email} onChange={this.handleChange}/>

          <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Login to your account" className="button-input"/>
        </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
