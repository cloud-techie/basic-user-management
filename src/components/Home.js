import React, { Component } from "react";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount() {
        fetch("https://i6e591cbkf.execute-api.ap-southeast-2.amazonaws.com/dev/users")
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    deleteUser(userId) {
        this.setState({message : 'User deleted successfully.'});
        this.setState({users: this.state.users.filter(user => user.id !== userId)});
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    saveUser(user) {
        var joined = this.state.users.concat(user);
        this.setState({users : joined});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">User Details</h2>
                <button className="btn btn-danger" onClick={() => this.addUser()}> Add User</button>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th className="d-none">Id</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                    user =>
                                    <tr key={user.id}>
                                        <td>{user.userName}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.createdAt}</td>
                                        <td>
                                            <button className="btn btn-success mr-2" onClick={() => this.deleteUser(user.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editUser(user.id)}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
