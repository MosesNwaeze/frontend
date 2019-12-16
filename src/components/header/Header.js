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
          console.log(image);
        } else {
          const { message } = data;
          this.setState({ message });
        }
      })
      .catch(error => console.error(error));
      document.querySelector(`form[name="profile-pic"]`).style.display = 'none';

  }

  profilePic(event) {
    const pic = event.target.files[0];
    this.setState({ pic });
  }
  render() {
    const path = this.state.src;
    console.log(path);
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
                src={localStorage.getItem("profile-pic") || "images/pip3.jpg"}
                alt="user"
                className="img rounded"
                style={{ width: "333px", height: "250px" }}
              />
            </p>
            <form className="custom-file" name="profile-pic">
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
