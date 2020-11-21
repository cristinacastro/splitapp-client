import React, { Component } from 'react';
import axios from 'axios';

export default class AddCost extends Component {
    
    state = {
        concept: "",
        costImport: 0,
    }
    
    
    handleSubmit = async (e) => {
        const {concept, costImport} = this.state;
        e.preventDefault();
        console.log('hola')
        try{
            const res = await axios({
                method: 'POST',
                url: `http://localhost:4000/costs/add/${this.props.location.state.groupsList._id}`, 
                withCredentials: true,
                data: {concept: concept, costImport: costImport}
            })

        this.setState({
            concept: "",
            costImport: 0
        })
            
        } catch (error) {
            console.log(error, 'POST expenses error')
        }
    }
    
    
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
      }

      render() {
        return (
            <div>
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
