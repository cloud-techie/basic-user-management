import React, { Component } from "react";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount() {
        fetch("https://to37kj1zuk.execute-api.ap-southeast-2.amazonaws.com/dev/users")
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

    deleteUser(userName) {
        if (window.confirm("Are you sure??")) {
            this.setState({message : 'User deleted successfully.'});
            const requestOptions = {
                method: 'delete'
            };
            fetch("https://to37kj1zuk.execute-api.ap-southeast-2.amazonaws.com/dev/user/" + userName, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    this.componentDidMount();
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );            
        }
    }

    editUser(userName) {
        window.localStorage.setItem("userName", userName);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
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
                                        <td>
                                            <button className="btn btn-success mr-2" onClick={() => this.editUser(user.userName)}> Edit</button>
                                            <button className="btn btn-success" onClick={() => this.deleteUser(user.userName)}> Delete</button>
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
