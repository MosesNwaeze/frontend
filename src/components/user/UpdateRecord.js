import React, { Component } from "react";
import {HashRouter as Router, Link} from 'react-router-dom'

class UpdateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message: "",
      selectedOption: ""
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.fetchAccount = this.fetchAccount.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    const { email } = this.props.match.params;
    this.fetchAccount(email);
  }

  async handleUpdate(event) {
    event.preventDefault();
    const { email } = this.props.match.params;
    const form = event.target;
    const formData = new FormData(form);

    await fetch(`https://teamwork-backends.herokuapp.com/api/v1/auth/user/${email}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
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
        }
      })
      .catch(error => console.error(error));
  }

  fetchAccount(email) {
    fetch(`https://teamwork-backends.herokuapp.com/api/v1/auth/user/${email}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          const { result } = data;
          this.setState({ data: result });
        } else {
          const { message } = data;
          this.setState({ message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { data } = this.state;
    return (
      <div
        className="card text-light mt-2 shadow px-4 "
        style={{ background: "#8967C6" }}
      >
        <h1 className="text-light text-center">
          Update Your Record &nbsp;&nbsp;&nbsp;
          <Router>
            <Link to="/app" className="text-decoration-none text-success"><span style={{color:"#46216D"}}>Back To Home</span></Link>
          </Router>
        </h1>
        <h4 className="display-5 font-weight-bolder text-center text-success bg-light">
          {this.state.message}
        </h4>
        <div className="card-body p-0">
          <div className="o-hidden border-0 ">
            <form className="user" onSubmit={this.handleUpdate}>
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor="employeeid">Employee ID:</label>
                      <input
                        type="text"
                        id="employeeid"
                        name="employeeid"
                        defaultValue={item.empid}
                        className="form-control form-control-user"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name:</label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        defaultValue={item.firstname}
                        className="form-control form-control-user"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Last Name:</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        defaultValue={item.lastname}
                        className="form-control form-control-user"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={item.email}
                        className="form-control form-control-user"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="jobrole">Job Role:</label>
                      <textarea
                        rows="8"
                        cols="70"
                        defaultValue={item.jobrole}
                        name="jobrole"
                        id="jobrole"
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="">
                      <label htmlFor="department">Department:</label>
                      <select
                        name="department"
                        id="department"
                        className="custom-select form-group"
                        value={item.department}
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
                        <option value="Security">Security</option>
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
                        defaultValue={item.address}
                        name="address"
                        id="address"
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender:&nbsp;&nbsp;&nbsp;</label>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="custom-control-input"
                          id="male"
                          defaultChecked={item.gender === "male"}
                        />
                        <label className="custom-control-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="custom-control-input"
                          id="female"
                          defaultChecked={item.gender === "female"}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="female"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="form-group">
                <button
                  type="submit"
                  className="btn form-control text-light"
                  style={{ background: "#46216D" }}
                >
                  Update Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateRecord;
