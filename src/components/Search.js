import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";	


class Search extends Component {
  state = {
    search: ""
  }

  handleChange = e => {
    const { name, value } = e.target;
      this.setState({[name]: value})
      this.props.filterMembers(value);
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          className="input search-bar" 
          name="search" 
          placeholder="Search" 
          value={this.state.search} 
          onChange={this.handleChange} 
        />
      </div>
    )
  }
}
export default withAuth(Search);
