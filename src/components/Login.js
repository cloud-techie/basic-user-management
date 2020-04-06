import React, { Component } from "react";

export default class Login extends Component {

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        //fetch('/api/form-submit-url', {
            //method: 'POST',
            //body: data,
        //});
        if ("admin" === data.get("username") && "admin" === data.get("password")) {
            // redirect to home page
            console.log("redirecting to home page");
            this.props.history.push("/home");
        } else {
            // throw error
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-5 offset-lg-3">
                    <form onSubmit={this.handleLogin}>
                        <h3 className="text-center">Sign In</h3>
                        <div className="form-group">
                            <label className="text-left">Username</label>
                            <input type="username" name="username" className="form-control" placeholder="Enter Username" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter password" required />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="/forgot-password">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}