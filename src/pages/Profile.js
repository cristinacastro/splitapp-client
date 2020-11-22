import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import service from "../api/service";

class Profile extends Component {

  state = {
    userProfile: {},
    editModeEnabled: true,
  };

  getUserInfo = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/profile",
        withCredentials: true,
      });
      this.setState({
        userProfile: res.data,
      });
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };
  componentDidMount() {
    this.getUserInfo();
  }

  handleFileUpload = async (e) => {
    console.log("the file to be uploadesd is: ", e.target.files[0])
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0])
    try{
        const res = await service.handleFileUpload(uploadData)
        console.log("response is", res)
        this.setState({image: res.secure_url})
    }catch (error){
      console.log("Error while uploading the file: ", error)
    }
}

  handleEditClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios(
        {
          method: "PUT",
          url:
            "http://localhost:4000/profile/edit/" + this.state.userProfile._id,
          withCredentials: true,
          data: { email: this.state.userProfile.email, image: this.state.image }
        }
        
      );
      //  this.setState({ editModeEnabled: !this.state.editModeEnabled });
    } catch (error) {
      console.log(error, "POST expenses error");
    }
  };


  render() {
    return (
      <div>
        <h1>Your profile</h1>
        <form onSubmit={this.handleEditClick}>
          <p>{this.state.userProfile.username}</p>
          <label for="image"> Image: </label>
          <input
            type="file"
            name="image"
            value=''
            onChange={(e) => this.handleFileUpload(e)}
          />
          <input type="email" value={this.state.userProfile.email} />
          <a
            role="button"
            title="Edit"
            onClick={this.handleEditClick.bind(this)}
          >
            
          </a>
          <p>Bizum:{this.state.userProfile.phone}</p>
          <button>Edit bizum</button>
          <div>
            <input type="submit" value="Save group" />
          </div>
        </form>
      </div>
    );
  }
}
export default withAuth(Profile);
