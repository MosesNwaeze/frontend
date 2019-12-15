import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: null,
      src: ""
    };
    this.handleProfilePic = this.handleProfilePic.bind(this);
    this.profilePic = this.profilePic.bind(this);
  }

  handleProfilePic(event) {
    event.preventDefault();
    const { pic } = this.state;
    localStorage.setItem("pic", pic.name);
  }

  profilePic(event) {
    const pic = event.target.files[0];
    this.setState({ pic });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-3 Logo">
            <img
              src="/images/logo3.jpg"
              alt="Logo"
              className="img rounded d-block img-fluid"
            />
          </div>
          <div className="col-5 SiteName">
            <h1 className="h1 mb-0 text-center display-3">Teamwork</h1>
            <p>
              <span style={{ textAlign: "center" }}>
                <strong>
                  Motto: <i>Fostering cooperation among employees</i>
                </strong>
              </span>
            </p>
            <p style={{ textAlign: "center" }}>
              <span className="h4">
                Welcome{" "}
                <i>
                  <b style={{ color: "#D4C8EA" }}>
                    {localStorage.getItem("lastname")}
                  </b>
                </i>
                &nbsp;&nbsp;&nbsp;
                <Router>
                  <Link
                    to="/logout"
                    className="btn small"
                    style={{ backgroundColor: "#C8B5E8", color: "white" }}
                  >
                    Logout
                  </Link>
                </Router>
              </span>
            </p>
          </div>
          <div className="col-4 UserImage">
            <p>
              <img
                src="images/pip3.jpg"
                alt="user"
                className="img rounded"
                style={{ width: "333px", height: "200px" }}
              />
            </p>
            <form className="custom-file">
              <input
                type="file"
                name="image"
                className="custom-file-input"
                onChange={this.profilePic}
                id="file1"
              />
              <label htmlFor="file1" className="custom-file-label">
                {" "}
                Choose File
              </label>
              <button
                type="submit"
                className="btn form-control"
                onClick={this.handleProfilePic}
                style={{ background: "#C8B5E8", color: "white" }}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Header;
