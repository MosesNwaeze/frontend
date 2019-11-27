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
                  <Link to="/create-article">Create Article</Link>
                </li>
                <li>
                  <Link to="/edit-article">Edit Article</Link>
                </li>
                <li>
                  <Link to="/delete-article">Delete Article</Link>
                </li>
                <li>
                  <Link to="/search-article">View Article</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-12">
              <h1 className="h1">Gif</h1>
              <hr />
              <ul>
                <li>
                  <Link to="/create-gif">Create Gif</Link>
                </li>
                <li>
                  <Link to="/delete-gif">Delete Article</Link>
                </li>
                <li>
                  <Link to="/search-gif">View Gif</Link>
                </li>
              </ul>
            </div>
            <h1 className="h1">
              <Link to="/feed">Feed</Link>
            </h1>
            <hr />
          </Router>
        </div>
      </div>
    );
  }
}

export default Sidebar;
