import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";	
import "./Home.css";


class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='home center-div'>
        {isLoggedin ? (
          <div className="center-div home-loggedin">
            <>
              <p>{user.username}</p>
              <button onClick={logout}><img src="./../images/logout-white.png"></img></button>
            </>
          </div>
        ) : (
          <div class="home-buttons">
          <>
            <Link to='/login'>
              <button className='navbar-button'>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button'>Sign Up</button>
            </Link>
          </>
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
