import React from "react";
import { withRouter, HashRouter as Router, Link } from "react-router-dom";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      indicator: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    switch (formData.department) {
      case "Admin": {
        fetch("https://teamwork-backends.herokuapp.com/api/v1/auth/admin", {
          method: "POST",
          body: formData,
          headers: {
            "Accept-Version": 1.5,
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(({ status, data }) => {
            if (status === "success") {
              const { message } = data;
              this.setState({ message });
            } else {
              const { message } = data;
              this.setState({ message });
              this.setState({ indicator: 0 });
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ message: "User data are not entered" });
            this.setState({ indicator: 0 });
            return;
          });
        break;
      }
      case formData.department: {
        fetch("https://teamwork-backends.herokuapp.com/api/v1/auth/user", {
          method: "POST",
          body: formData,
          headers: {
            "Accept-Version": 1.5,

            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(({ status, data }) => {
            if (status === "success") {
              const { message } = data;
              this.setState({ message });
            } else {
              const { message } = data;
              this.setState({ message });
              this.setState({ indicator: 0 });
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ message: "User data are not entered" });
            this.setState({ indicator: 0 });
            return;
          });
        break;
      }
      default: {
        this.setState({ message: "Error creating Account" });
        this.setState({ indicator: 0 });
        break;
      }
    }
  }

  render() {
    const { message } = this.state;
    const { indicator } = this.state;
    const messageStyle = message ? "block" : "none";
    const style = indicator
      ? { color: "green", fontWidth: "bold" }
      : { color: "red", fontWidth: "bold" };
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 ">
            <div
              className="card o-hidden border-0 shadow-lg my-5 text-white"
              style={{ background: "#8967C6" }}
            >
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h3 style={style}>
                      {message} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ display: messageStyle }}>
                        <Router>
                          <Link to="/admin">Back To Admin</Link>
                        </Router>
                      </span>
                    </h3>
                  </div>
                  <div className="my-5 text-center">
                    <h3 className="font-weight-bold">Account Creation Form</h3>
                  </div>
                  <form
                    className="user was-validated"
                    onSubmit={this.handleSubmit}
                    name="User"
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
                      <label htmlFor="firstname">First Name:</label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        className="form-control form-control-user"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Last Name:</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        className="form-control form-control-user"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
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
                    <div className="form-group">
                      <label htmlFor="gender">Gender:&nbsp;&nbsp;&nbsp;</label>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="custom-control-input"
                          id="female"
                        />
                        <label
                          className="custom-control-label text-light"
                          htmlFor="female"
                        >
                          Female
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="custom-control-input"
                          id="male"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label text-light"
                          htmlFor="male"
                        >
                          Male
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="jobrole">Job Role:</label>
                      <textarea
                        rows="8"
                        cols="70"
                        placeholder="Job Role"
                        name="jobrole"
                        id="jobrole"
                        className="form-control"
                        required
                      ></textarea>
                    </div>
                    <div className="">
                      <label htmlFor="department">Department:</label>
                      <select
                        name="department"
                        id="department"
                        className="custom-select form-group"
                      >
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Financial And Accounting">
                          Financial And Accounting
                        </option>
                        <option value="Admin">Administration</option>
                        <option value="Health">Health Care</option>
                        <option value="Social">Social Workers</option>
                        <option value="Security" selected>
                          Security
                        </option>
                        <option value="Procurement">Procurement</option>
                        <option value="Human Resource">Human Resource</option>
                        <option value="Driver">Driver</option>
                        <option value="Publicity">Publicity</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <textarea
                        rows="8"
                        cols="70"
                        placeholder="Address"
                        name="address"
                        id="address"
                        className="form-control"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn form-control text-light"
                        style={{ background: "#46216D" }}
                      >
                        Create Account
                      </button>
                      <button
                        type="reset"
                        className="btn btn-danger form-control"
                      >
                        Reset Entries
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateAccount);
