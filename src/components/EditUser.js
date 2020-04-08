import React, { Component } from 'react'

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        fetch("https://to37kj1zuk.execute-api.ap-southeast-2.amazonaws.com/dev/user/" + window.localStorage.getItem("userName"))
        .then(response => response.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    userName: result.userName,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    phoneNumber: result.phoneNumber
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        );
    }

    saveUser = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(
                {
                    userName: this.state.userName,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber 
                }
            )
        };
        fetch('https://to37kj1zuk.execute-api.ap-southeast-2.amazonaws.com/dev/user', requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({message: "User added successfully."});
                this.props.history.push('/home');
            },
            (error) => {
                this.setState({message: "Some problem in create user. Please try again."});
                this.props.history.push('/home');
            }
        );
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push('/home');
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="col-lg-5 offset-lg-3">
                <h2 className="text-center mb-3">Add User</h2>
                <form>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" required placeholder="Username" name="userName" className="form-control" value={this.state.userName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input placeholder="First Name" required name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input placeholder="Last Name" required name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" placeholder="Email" required name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input placeholder="Phone Number" required name="phoneNumber" className="form-control" value={this.state.phoneNumber} onChange={this.onChange}/>
                    </div>
                    <button className="btn btn-success mr-3" onClick={this.saveUser}>Save</button>
                    <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                </form>
            </div>
        );
    }
}