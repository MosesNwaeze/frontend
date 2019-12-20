import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
      localStorage.removeItem('token');
     
  }  
  render() {
    return (
      <div className="container">
        <h1 className="text-light py-3 text-center">
          Logout success.{" "}
          <Router>
            <Link to="/" className="text-success text-decoration-none text-style-italic">
              Click To Login
            </Link>
          </Router>
        </h1>
      </div>
    );
  }
}
export default Logout;
