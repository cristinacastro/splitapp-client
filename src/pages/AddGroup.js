import React, { Component } from 'react';
import axios from 'axios';
import Search from "../components/Search";

export default class AddGroup extends Component {

    state = {
        name: "",
        image: "",
        members: [],
        filterMembers: []

    }

    componentDidMount() {
        this.getAllMembers();
      }


    getAllMembers = async () => {
        try{
            const res = await axios({
                method: 'GET',
                url: 'http://localhost:4000/profile/allusers', 
                withCredentials: true
            })
    
             this.setState({
                members: res.data
            });
            console.log(this.state.members)
        } catch (error) {
          console.log(error, 'GET expenses error')
        }
      }

      filterMembers = (query) => {
        axios.get(`http://localhost:4000/profile/allusers/search?q=${query}`)
        .then((response) => {
          const searchResult = response.data;
          this.setState({ members: searchResult });
        })
        .catch((err) => console.log(err));
      }

    render() {
        return (
            <div>
                <h1>feio</h1>
                {this.state.members.map(members =>{
                    return (members.username)
                })}
                {this.state.members.username}
                <Search filterMembers={this.filterMembers} />
                {this.state.filterMembers.map(member => {
                    return (
                        <div>'Hola'</div>
                        // <BeerCard key={member._id} {...member} />
                    )
                    })}


                 <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Concept:</label>
                        <input type="text" name="concept" value={this.state.concept} onChange={this.handleChange} />
                    </div>

                    <div>
                        <label>Import:</label>
                        <input type="number" name="costImport" value={this.state.costImport} onChange={this.handleChange}  />
                    </div>
                    <div>
                        <input type="submit" value="Add new beer" />
                    </div>
                </form>

            </div>
        )
    }
}
