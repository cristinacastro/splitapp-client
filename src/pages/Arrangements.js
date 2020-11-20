import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import axios from 'axios';
import auth from "../lib/auth-service";


class Arrangements extends Component {

 state = {
    listOfExpenses: [],
  }

  getAllExpenses = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4000/arrangements', 
            withCredentials: true
        })

         this.setState({
          listOfExpenses: res.data
        });
      } catch (error) {
      console.log(error, 'GET expenses error')
    }
  }

  componentDidMount() {
        this.getAllExpenses();
    }

    render() {
        return (
            <div>
            <h1>jfio</h1>
                <div>
                    {this.state.listOfExpenses.map((eachExpense) => {
                    return (
                        // usamos el '_id' de cada project como 'key'
                        <div key={eachExpense._id}>
                            <h3>{eachExpense.expenseImport}</h3>
                        {/* <Link to={`/projects/${eachProject._id}`}>
                            <h3>{eachProject.title}</h3>
                        </Link> */}
                        </div>
                    );
                    })}
                </div>
            </div>
        )
    }
}

export default withAuth(Arrangements);
