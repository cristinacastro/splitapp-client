import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import EachExpense from "../components/EachExpense";
import axios from "axios";
import { isElementOfType } from "react-dom/test-utils";
import Navbar from "../components/Navbar";
import "./GroupDetails.css";
import "./Groups.css";



class GroupDetails extends Component {
  state = {
    listOfExpenses: [],
    listOfCosts: [],
    group: this.props.location.state.groupsList,
    allImports: [],
    newArr: [],
    total: 0,
    sum: 0,
    checked: true,
  };

  componentDidMount() {
    this.getTotal();
    this.getCosts();
  }
  

  getCosts= async () => {
    try {
      const res = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_API_URL +
          `/all-costs/${this.state.group._id}`,
        withCredentials: true,
      });
      this.setState({
        listOfCosts: res.data,
      });
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  getExpenses = async () => {
    try {
      const res = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_API_URL +
          `/expenses/all/${this.state.group._id}`,
        withCredentials: true,
      });
      this.setState({
        listOfExpenses: res.data,
      });
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  getAllExpenses = async () => {
    try {
      const res = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_API_URL +
          `/expenses/add/${this.state.group._id}`,
        withCredentials: true,
      });

      this.setState({
        listOfExpenses: res.data,
      });
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  getTotal = () => {
    this.state.group.costs.map((eachImport) => {
      this.state.newArr.push(eachImport.costImport);
    });
    this.setState({
      newArr: this.state.newArr,
    });
    if (this.state.newArr.length == 0) {
      this.state.sum = 0;
    } else if (this.state.newArr.length == 1) {
      this.state.sum = this.state.newArr[0];
    } else {
      this.state.newArr.reduce((acc, curr) => {
        this.state.sum = acc + curr;
        return this.state.sum;
      });
    }
  };

  deleteGroup = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        url:
          process.env.REACT_APP_API_URL +
          `/groups/delete/${this.state.group._id}`,
        withCredentials: true,
      });
      this.props.history.push("/groups")

    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

  

  render() {
    return (
      <div className="groups-details-page">
         <div className="groups-details-header">
            {/* <button onClick={this.props.history.goBack}>Go Back</button> */}
            <img src={this.state.group.image} className="group-image"/>
            <h3>{this.state.group.name}</h3>
            <h6> This group has {this.state.group.members.length} members</h6>
              <button onClick={this.deleteGroup}>Delete group</button>
          </div>

          <div className="group-details-body">
            
            <div className="group-details-content">
              <div className="cost-list-section">
                <h3>Costs list</h3>
              <Link className="input-button-datils" to={{pathname: `/groups-addCost/${this.state.group._id}`,
                  state: { groupsList: this.state.group },
                }}
              >
                ADD COST
              </Link>

                          {this.state.listOfCosts.map((eachCost) => {
                            return (
                              <div className="each-cost">
                                <div className="each-cost-section">
                                <p>Date: {eachCost.date && eachCost.date.slice(0, 10)}</p>
                                <h3>{eachCost.concept}</h3>


                                </div>
                                <div className="each-cost-section align-right">
                                <h2>{eachCost.costImport}€</h2>
                                {this.state.group.members.map((eachMember) => {
                                  if (eachMember._id === eachCost.buyer) {
                                    return <p>Paid by <span>{eachMember.username}</span></p>;
                                  }
                                })}
                                </div>
                              </div>
                            );
                          })}
                
                <div className="total-cost-div">
                  {/* <div>
                    <span>Total costs:</span>
                  </div>
                  <div className="center-div">
                    <h4>{this.state.sum}€</h4>
                  </div> */}
                </div>
              </div>



              <div className="cost-list-section">
                <h3>All Expenses</h3>
                <div>
                  <button onClick={this.getAllExpenses} className="input-button-datils">SPLIT EXPENSES</button>
                </div>

                {this.state.listOfExpenses.map((eachExpense) => {
                  return (
                    <div>
                      <EachExpense
                        key={eachExpense._id}
                        theExpense={eachExpense}
                        theGroup={this.state.group}
                        refreshFunction={this.getExpenses}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="center-div">
          <Navbar />
          </div>
      </div>
    );
  }
}

export default withAuth(GroupDetails);
