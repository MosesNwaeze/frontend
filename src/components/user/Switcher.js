import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from "./Create.js";
import Login from "./login";
import App from "../../App";
import Admin from "../admin/Admin";
import Logout from './Logout';
import UpdateRecord from './UpdateRecord';
import {createBrowserHistory} from 'history';

class Switcher extends React.Component {
  render() {
    const history = createBrowserHistory();
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Switch>
              <Route component={Login} path="/" exact />
              <Route component={CreateAccount} path="/admin/create-account" />
              <Route component={Admin} path="/admin" />
              <Route component={App} path="/fontend" />
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
