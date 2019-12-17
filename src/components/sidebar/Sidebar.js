import React from "react";
import { Link, HashRouter as Router } from "react-router-dom";
class Sidebar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row vertical">
          <Router>
            <div className="col-md-12 d-block">
              <h1
                className="display-5 font-weight-bolder mt-5 mb-4"
                style={{ color: "#2B0639" }}
              >
                Actions
              </h1>
              <hr style={{ backgroundColor: "white" }}/>
              <div className="list-group">
                <Link
                  to="/app/create-article"
                  className="list-group-item list-group-item-action list-group-item-success mb-4"
                  style={{ background: "#6338B0", color: "white" }}
                >
                  Create Article
                </Link>

                <Link
                  to="/app/create-gif"
                  className="list-group-item list-group-item-action list-group-item-success mb-4"
                  style={{ background: "#6338B0", color: "white" }}
                >
                  Create Gif
                </Link>

                <Link
                  to="/app/feed"
                  className="list-group-item   list-group-item-action list-group-item-success mb-4"
                  style={{ background: "#6338B0", color: "white" }}
                >
                  View Feed
                </Link>
              </div>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Sidebar;
