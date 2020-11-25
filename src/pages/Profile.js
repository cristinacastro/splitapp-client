import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import service from "../api/service";

import "./Profile.css";


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
      <div className="page profile">
      
        <div className="cover" style={{backgroundImage: `url(./../images/gradient.jpg)`}}>
              <img className="profile-img" src={this.state.userProfile.image}/>
        </div>
  
          <div className="profile-container-flex">
              <div className="profile-items">
                <div className="edit-div">
              <h4>Your profile</h4>
              <Link to= {`/profile-edit/${this.state.userProfile._id}`} profiles={this.state.userProfile}><img src="./../images/edit-icon.jpg"/></Link>
              </div>
                {/* <img src="./../images/fondo.jpg" /> */}
                <p>Username:</p>
                <h5>{this.state.userProfile.username}</h5>
                <hr></hr>
             
                <p>Email:</p>
                <h5>{this.state.userProfile.email}</h5>
                <hr></hr>
                <p>Phone:</p>
                <h5>{this.state.userProfile.phone}</h5>
                <hr></hr>
                <p>Pyment method:</p>
                <h5>Bizum</h5>
             <hr></hr>
              </div>
          </div>
         <Navbar/> 

      </div>
    );
  }
}
export default withAuth(Profile);
