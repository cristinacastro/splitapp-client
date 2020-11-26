import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Arrangements.css";

class Arrangements extends Component {
  state = {
    listOfExpenses: [],
  };

  getAllExpenses = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/arrangements",
        withCredentials: true,
      });

      this.setState({
        listOfExpenses: res.data,
      });
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  componentDidMount() {
    this.getAllExpenses();
  }
  render() {
    //console.log(this.props.user._id, "dsf")

    return (
      <div className="groups-page">
        <div className="groups-header">
          <img src="./../images/arrengements-icon.png"></img>
          <h3>
            Your debts and incomes<br></br>at a glance
          </h3>
        </div>
        <div className="center-div dash-btn arrengementContainer">
          <h5>That's what you owe</h5>
          <hr></hr>
          {this.state.listOfExpenses.map((eachExpense) => {
            if (
              eachExpense.payer._id.toString() == this.props.user._id.toString()
            ) {
              return (
                <div>
                  <p>
                    {eachExpense.beneficiary.username} owes{" "}
                    {eachExpense.payer.username} {eachExpense.expenseImport.toFixed(2)}{" "}
                    euros
                  </p>

                  <Link
                    to={{
                      pathname: `/groups/${eachExpense.group._id}`,
                      state: {
                        groupsList: eachExpense.group,
                        costs: eachExpense.group.costs,
                      },
                    }}
                  >
                    {" "}
                    {eachExpense.group.name}{" "}
                  </Link>
                </div>
              );
            }
          })}
        </div>

        <div className="center-div dash-btn arrengementContainer">
          <h5>That's what you're owed</h5>
          <hr></hr>
          {this.state.listOfExpenses.map((eachExpense) => {
            console.log(eachExpense.beneficiary._id.usermame);
            if (
              eachExpense.beneficiary._id.toString() ==
              this.props.user._id.toString()
            ) {
              return (
                <div className = "arrengementDetails">
                <img src="./../images/incomes.png"></img>

                  <div className = "arrengementText">
                    <h6>
                      {eachExpense.payer.username} owes{" "}
                      {eachExpense.beneficiary.username}{" "}
                      {eachExpense.expenseImport.toFixed(2)} euros
                    </h6>
                      <p>{eachExpense.group.name}</p>
                  </div>
                  <div>
                  </div>
                </div>
              );
            }
          })}
        
        </div>
        <Navbar />
      </div>
    );
  }
}

export default withAuth(Arrangements);
