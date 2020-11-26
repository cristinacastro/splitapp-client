import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import "./Checkbox.css";


class Checkbox extends Component {
    state = {
        checked: false
    }
    render() {
        return (
            <div className="checkbox-container">
              {this.props.value}
            <input className="input-checkbox-size"
              type="checkbox"
              value={this.state.checked}
              onClick={() => {
                this.setState(prevState => ({
                  checked: !prevState.checked
                }));
    
                this.props.calculateTotal(this.props.value, !this.state.checked);
              }}
            />{" "}
          </div>
        )
    }
}


export default withAuth(Checkbox);
