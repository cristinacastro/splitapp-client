import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./EachExpense.css";



class EachExpense extends Component {

    state = {
        checked: false
      };

       
    changeBoolean = async () => {
    
        try {
          const res = await axios({
            method: "PATCH",
            url: process.env.REACT_APP_API_URL + `/expenses/edit/${this.props.theExpense._id}`,
            withCredentials: true,
            data: {payed: this.state.checked}
          });
    
        } catch (error) {
          console.log(error, "GET expenses error");
        }
      }


   deleteExpense = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        url: process.env.REACT_APP_API_URL + `/expenses/delete/${this.props.theExpense._id}`,
        withCredentials: true,
      });
      this.props.refreshFunction()
    } catch (error) {
      console.log(error, "GET expenses error");
    }
  }
 

    
      async handleCheckBox(e) {
        await this.changeBoolean()

        this.setState({
          checked: !this.state.checked
        })
      }
    
    render() {
        console.log(this.props.theExpense, "hhh")
        return (
            <div className="each-cost">
                 <div className="each-cost-section">
                   <div className="each-cost-phrase">
                          {this.props.theGroup.members.map(eachMember =>{
                              if(eachMember._id == this.props.theExpense.payer){
                                  return (
                                   <p>{eachMember.username }</p>
                                      )
                                  }
                              })}
                     
                          <p>owes</p>
                          
                      {this.props.theGroup.members.map(eachMember =>{
                          if(eachMember._id == this.props.theExpense.beneficiary){
                              return (
                                  <p> {eachMember.username} </p>
                                  )
                              }
                          })}
                        <p>{this.props.theExpense.expenseImport.toFixed(2)}€</p>
                    </div>
                        <button onClick={this.deleteExpense} >Delete</button>
                    </div>
                    <div className="check-div">
                      <p>Paid</p>
                      <input type="checkbox" onChange= {(e)=> this.handleCheckBox(e)} checked={this.state.checked}  />
                    </div>

                  
            </div>
        )
    }
}




export default withAuth(EachExpense);
