import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from 'axios';


const EachExpense = ({theExpense, theGroup}) => {
        return (
            <div>
                    <div>
                    {theGroup.members.map(eachMember =>{
                        if(eachMember._id == theExpense.payer){
                            return (
                                <p>{eachMember.username}</p>
                                )
                            }
                        })}
                    </div>
                        <p> owes </p>
                        <div>
                    {theGroup.members.map(eachMember =>{
                        if(eachMember._id == theExpense.beneficiary){
                            return (
                                <p>{eachMember.username}</p>
                                )
                            }
                        })}
                    </div>
                        <p>{theExpense.expenseImport}</p>
                  
                  

            </div>
        )
    }



export default withAuth(EachExpense);
