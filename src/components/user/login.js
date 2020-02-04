import React from "react";
import { HashRouter as Router, Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      indicator: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const { history } = this.props;
    event.preventDefault();
    const formEle = new FormData(document.querySelector(`form[name = login]`));
    const formData = {
      employeeid: formEle.get("employeeid"),
      password: formEle.get("password")
    };

    const serializedData = JSON.stringify(formData);
    await fetch("https://teamwork-backends.herokuapp.com/api/v1/auth/signin", {
      method: "POST",
      body: serializedData,
      headers: {
        "Content-Type": "Application/x-www-form-urlencoded",
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          const { message } = data;
          this.setState({ message });
          // implement jwt to handle user data instead of localstorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("firstname", data.firstname);
          localStorage.setItem("lastname", data.lastname);

          const userId = data.userId;
          if (userId.toUpperCase().substr(0, 3) === "ADM") {
            //window.location = "/#/admin";
            history.push("/admin");
          } else {
            //window.location = "/#/app/feed";
            history.push("/frontend/feed");
          }
        } else {
          const { message } = data;
          this.setState({ message });
          this.setState({ indicator: 0 });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ message: "Error in login" });
        this.setState({ indicator: 0 });
      });
  }
  render() {
    const { message } = this.state;
    const { indicator } = this.state;
    const style = indicator
      ? { color: "green", fontWidth: "bold" }
      : { color: "red", fontWidth: "bold" };
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-white">
            <div
              className="card o-hidden border-0 shadow-lg my-5"
              style={{ background: "#8967C6" }}
            >
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="my-5">
                    <h3 style={style} className="text-center my-5">
                      {message}
                    </h3>
                    <h3 className="text-center text-white">
                      You must login to use this application
                    </h3>
                  </div>

                  <form
                    name="login"
                    onSubmit={this.handleSubmit}
                    className="user was-validated"
                  >
                    <div className="form-group">
                      <label htmlFor="employeeid">Employee ID:</label>
                      <input
                        type="text"
                        id="employeeid"
                        name="employeeid"
                        placeholder="Employee ID"
                        className="form-control form-control-user"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-user"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn  btn-block btn-user"
                      style={{ color: "white", background: "#46216D" }}
                    >
                      Login
                    </button>
                  </form>
                  <hr style={{ background: "#1E1E1E" }} />
                  <div className="text-center">
                    <Router>
                      <Link
                        to="/#/forget-password"
                        className="small text-white"
                        replace
                      >
                        Forgot Password?
                      </Link>
                    </Router>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
