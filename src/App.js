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
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Profile from "./pages/Profile";
import AddCost from "./pages/AddCost";
import AddGroup from "./pages/AddGroup";




class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <div className='container'>
          <Home />

          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute exact path="/arrangements" component={Arrangements}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/groups" component={Groups}/>
            <PrivateRoute exact path="/groups/addCost/:id" component={AddCost}/>
            <PrivateRoute exact path="/groups/:id" component={GroupDetails}/>
            <PrivateRoute exact path="/add-group" component={AddGroup}/>
            <AnonRoute  exact path='/signup' component={Signup} />
            <AnonRoute  exact path='/login' component={Login} />

          </Switch>
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
