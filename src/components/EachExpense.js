import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class EachExpense extends Component {
    render() {
        return (
            <div>
                    <h1>Hola</h1>
            </div>
        )
    }
}


export default withAuth(EachExpense);
