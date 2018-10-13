import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login/Login";
import { Route, Router } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory'
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";
import HeaderBar from "./components/HeaderBar";
import AddJobForm from "./components/company/AddJobForm";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const newHistory = createBrowserHistory();

    return (
      <Router history={newHistory}>
        <div className="App">
          <HeaderBar />
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/dashboard/add" component={AddJobForm}/>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
