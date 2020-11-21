import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider"; 
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar"
class Profile extends Component {
    state = {
        userProfile: {},
        editModeEnabled: true,
    }
    getUserInfo = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4000/profile', 
            withCredentials: true
        })
         this.setState({
          userProfile: res.data
        });
      } 
      catch (error) {
      console.log(error, 'GET expenses error')
    }
  }
  componentDidMount() {
        this.getUserInfo();
    }
    handleEditClick = async() => {
    try{
        const res = await axios({
            method: 'PUT',
            url: 'http://localhost:4000/profile/edit/' + this.state.userProfile._id , 
            withCredentials: true
        }, {email: this.state.userProfile.email})
        //  this.setState({ editModeEnabled: !this.state.editModeEnabled });
      } 
      catch (error) {
      console.log(error, 'POST expenses error')
    }
  }
    render() {
        return (
            <div>
                <h1>hie</h1>
                <form>
                    <p>{this.state.userProfile.username}</p>
                    <input type="email" value={this.state.userProfile.email}/>
                    <a role="button" title="Edit" onClick={this.handleEditClick.bind(this)}>:pencil2:</a>
                    <p>Bizum:{this.state.userProfile.phone}</p>
                    <button>Edit bizum</button>
                </form>
            </div>
        )
    }
}
export default withAuth(Profile);