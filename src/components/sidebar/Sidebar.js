import React from "react";
import { Link, HashRouter as Router } from "react-router-dom";
class Sidebar extends React.Component {
  render() {
    return (
      <div className="container-fliud Sidebar">
        <div className="row vertical">
          <Router>
            <div className="col-md-12">
              <h1 className="h1">Article</h1>
              <hr />
              <ul>
                <li>
                  <Link to="/app/create-article">Create Article</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-12">
              <h1 className="h1">Gif</h1>
              <hr />
              <ul>
                <li>
                  <Link to="/app/create-gif">Create Gif</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-12">
              <h1 className="h1">Feed</h1>
              <hr />
              <ul>
                <li>
                  <Link to="/app/feed">View Feed</Link>
                </li>
              </ul>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Sidebar;
