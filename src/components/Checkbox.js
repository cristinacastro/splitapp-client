import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";

class Checkbox extends Component {
    state = {
        checked: false
    }
    render() {
        return (
            <div>
            <input
              type="checkbox"
              value={this.state.checked}
              onClick={() => {
                this.setState(prevState => ({
                  checked: !prevState.checked
                }));
    
                this.props.calculateTotal(this.props.value, !this.state.checked);
              }}
            />{" "}
            {this.props.value}
          </div>
        )
    }
}


export default withAuth(Checkbox);
