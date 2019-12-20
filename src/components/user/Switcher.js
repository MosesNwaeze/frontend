import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from "./Create.js";
import Login from "./login";
import App from "../../App";
import Admin from "../admin/Admin";
import Logout from './Logout';
import UpdateRecord from './UpdateRecord';

class Switcher extends React.Component {
  render() {
    return (
      <div className="container">
        <Router basename="/">
          <div>
            <Switch>
              <Route component={Login} path="/" exact />
              <Route component={CreateAccount} path="/admin/create-account" />
              <Route component={Admin} path="/admin" />
              <Route component={App} path="/app" />
              <Route component={Logout} path="/logout" />
              <Route component={UpdateRecord} path="/update-record/:email" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Switcher;
