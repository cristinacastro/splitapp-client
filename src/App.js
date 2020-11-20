import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthProvider from "./lib/AuthProvider";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Arrangements from "./pages/Arrangements";


class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <div className='container'>
          <Home />

          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute exact path="/arrangements" component={Arrangements}/>
            <AnonRoute  exact path='/signup' component={Signup} />
            <AnonRoute  exact path='/login' component={Login} />

          </Switch>
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
