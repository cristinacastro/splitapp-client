import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import EachExpense from "../components/EachExpense";
import axios from "axios";
import { isElementOfType } from "react-dom/test-utils";
import Navbar from "../components/Navbar";

class GroupDetails extends Component {
  state = {
    listOfExpenses: [],
    group: this.props.location.state.groupsList,
    allImports: [],
    newArr: [],
    total: 0,
    sum: 0,
    checked: true,
  };

  componentDidMount() {
    this.getTotal();
  }

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
      console.log(res, "lisFoExpenses");
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
      console.log(res, "gjirwgj");

      this.setState({
        listOfExpenses: res.data,
      });
      console.log(res, "lisFoExpenses");
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
    console.log(this.state.newArr, "imports");
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
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  };

/*   applyRegex = async () => {
   const dateRegex = new RegExp(' /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g');
    const eachDate = eachCost.date
    var dates = [
      "2009-10-09",
      "2009.10.09",
      "2009/10/09",
      "200910-09",
      "1990/10/09",
      "2016/0/09",
    ];

    //Iterate array
    dates.forEach(function (date) {
      console.log(date + " matches with regex?");
      console.log(regex.test(date));
    });
  };
 */
  render() {
    return (
      <div>
        <img src={this.state.group.image} />
        <h1>{this.state.group.name}</h1>
        <h1>{this.state.group.members.length} members</h1>
        <Link
          to={{
            pathname: `/groups/addCost/${this.state.group._id}`,
            state: { groupsList: this.state.group },
          }}
        >
          Add cost
        </Link>
        <button onClick={this.deleteGroup}>Delete group</button>
        <div>
          <h1>Costs list</h1>
          {this.state.group.costs.map((eachCost) => {
            console.log(eachCost, "cada cost");
            return (
              <div>
                <hr></hr>

                <h3>{eachCost.concept}</h3>
                <h3>{eachCost.costImport}</h3>

                <p>{eachCost.date}</p>

                {this.state.group.members.map((eachMember) => {
                  if (eachMember._id === eachCost.buyer) {
                    return <h1>Buyer:{eachMember.username}</h1>;
                  }
                })}

                <hr></hr>
              </div>
            );
          })}

          <h1>Total costs:</h1>
          {this.state.sum}

          <hr></hr>
          <h1>All Expenses</h1>
          <div>
            <button onClick={this.getAllExpenses}>Calcular</button>
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
        <button onClick={this.props.history.goBack}>Go Back</button>
        <Navbar />
      </div>
    );
  }
}

export default withAuth(GroupDetails);
