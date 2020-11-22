import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";	


class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: ""
    }
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
    
    e.preventDefault();
    this.props.filterMembers(this.state.query);
  }

  handleSubmit = e => { 
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="search-bar">
        <input 
          type="text" 
          name="query" 
          placeholder="Search for a group member"
          value={this.state.query} 
          onChange={this.handleChange} 
        />
      </form>
    )
  }
}

export default withAuth(Search);
