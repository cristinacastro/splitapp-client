import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";
import EachGroup from "../components/EachGroup";


class Groups extends Component {

 state = {
    listOfGroups: [],
  }

  getAllGroups = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4000/groups', 
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
    console.log('hola')
    try{
        const res = await axios({
            method: 'POST',
            url: `http://localhost:4000/groups/add`, 
            withCredentials: true,
            data: {}
        })
        window.location = `/groups/edit/${res.data._id}`

    this.setState({
        groupId: res.data._id,
    })
        
    } catch (error) {
        console.log(error, 'POST expenses error')
    }
  }

  componentDidMount() {
        this.getAllGroups();
    }

    render() {
        return (
            <div>
            <h1>Your groups</h1>
            <button onClick={this.createEmptyGroup}>Create Group</button>
                <div>
                {this.state.listOfGroups.map(eachGroup => {
                    console.log(eachGroup, "cada grup")
                    return (
                      <EachGroup key={eachGroup._id} groups={eachGroup}/>
                    )
                  })}
                </div>
            </div>
        )
    }
}

export default withAuth(Groups);
