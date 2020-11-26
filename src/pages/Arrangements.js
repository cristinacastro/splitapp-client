import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";
import GroupDetails from "./GroupDetails";
import Navbar from "../components/Navbar"
import "./Arrangements.css";



class Arrangements extends Component {

 state = {
    listOfArrangements: [],
  }

  getArrangements = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL +'/arrangements', 
            withCredentials: true
        })

         this.setState({
          listOfArrangements: res.data
        });
      } catch (error) {
      console.log(error, 'GET expenses error')
    }
  }

  componentDidMount() {
        this.getArrangements();
    }
    render() {
        
        
        return (
            <div className="groups-page">
        <div className="groups-header mb10">
          <img src="./../images/arrengements-icon.png"></img>
          <h3>Your debts and incomes<br></br>at a glance</h3>
            </div>
            <div>
                 <div  className="center-div arrengementContainer">
                 <h5  className="mb10">That's what you owe</h5>
                    {this.state.listOfArrangements.map(eachExpense => {
                    if(eachExpense.payer._id.toString() == this.props.user._id.toString()){
                        return (
                            <div className = "arrengementDetails">
                            <img src="./../images/debts.png"></img>
                            <div className = "arrengementText">
                            <h6>
                     {eachExpense.beneficiary.username} owes{" "}
                     {eachExpense.payer.username}{" "}
                     <span className="you-owe">{eachExpense.expenseImport.toFixed(2)}</span> euros
                   </h6>
                           </div>
                           
                           </div>
                        )
                    }
              
                               
                    })}
                </div> 
            
                <div className="center-div arrengementContainer">
                <h5 className="mb10">That's what you're owed</h5>
                    {this.state.listOfArrangements.map(eachExpense => {
                    if(eachExpense.beneficiary._id.toString() == this.props.user._id.toString()){
                        return (
                            <div className = "arrengementDetails">
                             <img src="./../images/incomes.png"></img>
                             <div className = "arrengementText">
                             <h6>
                      {eachExpense.payer.username} owes{" "}
                      {eachExpense.beneficiary.username}{" "}
                      <span className="you-owed">{eachExpense.expenseImport.toFixed(2)}</span> euros
                    </h6>
                            </div>
                            
                            </div>
                        )
                    }

                  
            
                    
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

export default withAuth(Arrangements);
