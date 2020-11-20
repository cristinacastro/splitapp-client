import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import axios from 'axios';



import Navbar from "../components/Navbar"

class Dashboard extends Component {

 
  render() {
    return (
      <div>
      <Link to='/profile'>
            <li>Perfil</li>
        </Link>
        <h1>Dashboard</h1>
        <div className="center-div dash-btn">
          <Link to='/arrangements'><button>Arrangements</button></Link>
        </div>

        <div className="center-div dash-btn">
          <Link to='/groups'><button>Groups</button></Link>
        </div>





        <Navbar/>
      </div>
    );
  }
}

export default withAuth(Dashboard);
