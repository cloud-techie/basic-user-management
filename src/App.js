import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Singup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import AddUser from "./components/AddUser";
import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light navbar-collapse">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>User Management Console</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"}>Log out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
