import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import service from "../api/service";

class Profile extends Component {

  state = {
    userProfile: {},
  };

  getUserInfo = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/profile",
        withCredentials: true,
      });
      this.setState({
        userProfile: res.data,
      });
      console.log(this.state.userProfile, "hhh")
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };
  componentDidMount() {
    this.getUserInfo();
  }



  render() {
    return (
      <div>
        <h1>Your profile</h1>
        <p>{this.state.userProfile.username}</p>
        {this.state.userProfile.email}
         <p>Bizum:{this.state.userProfile.phone}</p>
         <img src = {this.state.userProfile.image}/>
         <Link to= {`/profile-edit/${this.state.userProfile._id}`} profiles={this.state.userProfile}>Edit profile</Link>
      </div>
    );
  }
}
export default withAuth(Profile);
