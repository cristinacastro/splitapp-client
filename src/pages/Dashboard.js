import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Dashboard.css";




import Navbar from "../components/Navbar"

class Dashboard extends Component {

 
  render() {
    return (
      <div className="page dashboard">
        <div>
        
          <h3>Dashboard</h3>
          <div className="center-div dash-btn">
            <div>
            <img src="./../images/idea-icon.png"></img>
            </div>
            <div>
          <h4>Groups</h4>
          <p>Access to all your active grups and check all the costs and expenses.</p>
            <Link to='/groups'><button>VIEW GROUPS</button></Link>
          </div>
          </div>
          <div className="center-div dash-btn">
            <div>
          <img src="./../images/money-transfer-icon.png"></img>
          </div>
          <div>
            <h4>Arrangements</h4>
            <p>Check all your current debts and your pending incomes.</p>
            <Link to='/arrangements'><button>VIEW ARRANGEMENTS</button></Link>
          </div>
          
          </div>
          <div className="center-div dash-btn">
            <div>
            <img src="./../images/resume-icon.png"></img>
            </div>
            <div>
          <h4>Profile</h4>
          <p>Access to all your active grups and check all the costs and expenses.</p>
            <Link to='/profile'><button>VIEW YOUR PROFILE</button></Link>
          </div>
          </div>
        </div>
          <Navbar/>
      </div>
    );
  }
}

export default withAuth(Dashboard);
