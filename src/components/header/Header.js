/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: null,
      message: ""
    };
    this.handleProfilePic = this.handleProfilePic.bind(this);
    this.profilePic = this.profilePic.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
  }

  async handleProfilePic(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.pic);
    await fetch("https://teamwork-backends.herokuapp.com/api/v1/profile-pic", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          const { message, image } = data;
          localStorage.setItem("profile-pic", image.url);
          this.setState({ message });
        } else {
          const { message } = data;
          this.setState({ message });
        }
      })
      .catch(error => console.error(error));
    document.querySelector(`form[name="profile-pic"]`).style.display = "none";
  }

  profilePic(event) {
    const pic = event.target.files[0];
    this.setState({ pic });
  }

  changeProfilePic(event) {
    event.preventDefault();
    document.querySelector(`form[name="profile-pic"]`).style.display = "block";
  }
  render() {
    const display = localStorage.getItem("profile-pic") ? "none" : "block";
    return (
      <div className="mb-4">
        <div className="row">
          <div className="col-3 Logo">
            <img
              src="/images/logo3.jpg"
              alt="Logo"
              className="img rounded d-block img-fluid"
            />
          </div>
          <div className="col-5 SiteName card-body">
            <h1 className="font-weight-bolder	h1 pt-2 text-center">
              <Router>
                <Link
                  to="/frontend/feed"
                  className="text-decoration-none text-light"
                >
                  Team - Work
                </Link>
              </Router>
            </h1>
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
                    {localStorage.getItem("lastname") +
                      " " +
                      localStorage.getItem("firstname")}
                  </b>
                </i>
                &nbsp;&nbsp;&nbsp;
                <Router>
                  <Link
                    to="/logout"
                    className="btn small font-weight-bold"
                    style={{ backgroundColor: "#46216D", color: "white" }}
                  >
                    Logout
                  </Link>
                </Router>
              </span>
            </p>
          </div>
          <div
            className="col-4 UserImage"
            style={{ background: "#2B0639", width: "333px" }}
          >
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between mt-4">
              <h6 className="m-0 font-weight-bold text-light h5">Profile Pic</h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <Router>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.changeProfilePic}
                    >
                      Change Profile Pic
                    </a>
                    <Link
                      className="dropdown-item"
                      to={"/update-record/" + localStorage.getItem("email")}
                    >
                      Update Account
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </Router>
                </div>
              </div>
            </div>

            <div className="card-body px-0">
              <p className="mb-1">
                <img
                  src={localStorage.getItem("profile-pic") || "images/pip3.jpg"}
                  alt="user"
                  className="img rounded"
                  style={{ width: "333px", height: "250px" }}
                />
              </p>
              <form
                className="custom-file"
                name="profile-pic"
                style={{ display: display, width: "333px" }}
              >
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
                  style={{ color: "white", background: "#46216D" }}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
