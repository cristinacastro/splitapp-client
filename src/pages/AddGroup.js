import React, { Component } from "react";
import axios from "axios";
import Search from "../components/Search";
import service from "../api/service";

export default class AddGroup extends Component {
  state = {
    name: "",
    image: "",
    members: [],
    filterMembers: [],
    theMembers: []
  };

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/profile/allusers",
        withCredentials: true,
      });

      this.setState({
        members: res.data,
      });
      //console.log(this.state.members);
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  handleFileUpload = async (e) => {
    console.log("the file to be uploadesd is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const res = await service.handleFileUpload(uploadData);
      console.log("response is", res);
      this.setState({ image: res.secure_url });
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  filterMembers = (searchTerm) => {
    const searchedTerm = searchTerm.toLowerCase();
    const filteredList = [...this.state.members].filter((memberObj) => {
      return memberObj.username.toLowerCase().includes(searchedTerm);
    });
    if (searchTerm) {
      this.setState({ filterMembers: filteredList });
    } else {
      this.setState({ filterMembers: [] });
    }
    console.log(this.state.filterMembers, "filter")
  };

  memberPush = () => {
    this.state.theMembers.push(this.state.filterMembers[0]);
    this.setState({
      theMembers: this.state.theMembers,
      filterMembers: [],
    });
    console.log(this.state.theMembers, "jgrni9gjr");
  };

  handleSubmit = async (e) => {
    const { name, theMembers, image } = this.state;
    const { params } = this.props.match;

    e.preventDefault();
    console.log("hola");
    try {
      const res = await axios({
        method: "PATCH",
        url: `http://localhost:4000/groups/edit/${params.id}`,
        withCredentials: true,
        data: { name: name, members: theMembers, image: image },
      });
      console.log(res);
      //console.log(this.props.location.state.groupsList);
      this.setState({
        name: this.state.name,
        image: this.state.image,
        members: [],
      });
    } catch (error) {
      console.log(error, "POST expenses error");
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Create your group</h1>
        <h3>Select the members of your group:</h3>
        <br></br>
        <Search filterMembers={this.filterMembers} />
        {this.state.filterMembers.map((member) => {
          return (
            <div>
              {member.username}
              <button onClick={this.memberPush} id="show-all">
                Add member
              </button>
            </div>
          );
        })}

        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Group's name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            /></div>
             <div>
            <label htmlFor="image">Group's image: </label>
            <input
              type="file"
              name="image"
              value=""
              onChange={this.handleFileUpload}
            />
          </div>
          <br></br>
          <div>
            <input type="submit" value="Save group" />
          </div>
        </form>

      </div>
    );
  }
}
