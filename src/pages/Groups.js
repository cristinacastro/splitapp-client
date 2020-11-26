import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";
import EachGroup from "../components/EachGroup";
import Navbar from "../components/Navbar"
import "./Groups.css";



class Groups extends Component {

 state = {
    listOfGroups: [],
  }

  getAllGroups = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + '/groups', 
            withCredentials: true
        })

         this.setState({
            listOfGroups: res.data
        });
      } catch (error) {
      console.log(error, 'GET expenses error')
    }
  }

  createEmptyGroup = async(e) => {
    e.preventDefault();
    try{
        const res = await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + `/groups/add`, 
            withCredentials: true,
           
        })
        window.location = `/groups-edit/${res.data._id}`

    } catch (error) {
        console.log(error, 'POST expenses error')
    }
  }

  componentDidMount() {
        this.getAllGroups();
    }

    render() {
        return (
         
            <div className="groups-page">
              <div className="groups-header">
                <img src="./../images/idea-icon.png"></img>
                <h3>What are you sharing <br></br>today?</h3>
                {/* <p>In this section you can add as many groups as you want and start spliting expenses in an easy way.</p> */}
              </div>
              <div className="group-list-button">
                <div className="center-div mb10">
                <button onClick={this.createEmptyGroup} className="input-button">CREATE GROUP</button>
                </div>
                      <div>
                      {this.state.listOfGroups.map(eachGroup => {
                          return (
                            <EachGroup key={eachGroup._id} groups={eachGroup}/>
                          )
                        })}
                      </div>
              </div>
              <div className="center-div">
              <Navbar/> 
              </div>
            </div>
        )
    }
}

export default withAuth(Groups);
