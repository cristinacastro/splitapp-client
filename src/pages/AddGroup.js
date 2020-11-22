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
        try {
            const res = await axios({
                method: 'GET',
                url: 'http://localhost:4000/profile/allusers',
                withCredentials: true
            })

            this.setState({
                filterMembers: res.data
            });
            console.log(this.state.members)
        } catch (error) {
            console.log(error, 'GET expenses error')
        }
    }

    filterMembers = (query) => {
        axios.get(`http://localhost:4000/profile/allusers/search?q=${query}`, { withCredentials: true })
            .then((response) => {
                const searchResult = response.data;
                this.setState({ filterMembers: searchResult });
                console.log(searchResult[0], 'gherigirhgir')
            })
            .catch((err) => console.log(err));
        console.log(this.state.members, 'holafrwgvreg')
    }
    memberPush = () => {
        //   const cristina = this.state.members
        //     const arrayWithMembers = cristina.push(this.state.filterMembers[0])
        this.state.members.push(this.state.filterMembers[0])
        this.setState({
            members: this.state.members
        })
        console.log(this.state.members, 'jgrni9gjr')
    }

    handleSubmit = async (e) => {
        const { name, members } = this.state;
        const { params } = this.props.match;

        e.preventDefault();
        console.log('hola')
        try {
            const res = await axios({
                method: 'POST',
                url: `http://localhost:4000/groups/edit/${params.id}`,
                withCredentials: true,
                data: { name: name, members: members }
            })
            console.log(res)
            console.log(this.props.location.state.groupsList, 'pdqeowrijggggggueqwslmfeklegnjduie')
            this.setState({
                name: this.state.name,
                members: []
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
                <h1>feio</h1>
                {this.state.members.map(members => {
                    return (members.username)
                })}
                {this.state.members.username}
                <Search filterMembers={this.filterMembers} />
                {this.state.filterMembers.map(member => {
                    return (
                        <div>{member.username}
                            <button onClick={this.memberPush} id="show-all">
                                Add member
                            </button>

                        </div>
                    )
                })}

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>

                
                    <div>
                        <input type="submit" value="Save group" />
                    </div>
                </form>


            </div>
        )
    }
}
