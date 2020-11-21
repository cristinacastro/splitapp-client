import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
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

  componentDidMount() {
        this.getAllGroups();
    }

    render() {
        return (
            <div>
            <h1>Your groups</h1>
            <Link to='/add-group'>
            <li>Create Group</li></Link>
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
