import React from "react";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const elements = document.querySelector(`form[name = User]`).elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      let item = elements.item(i);
      formData[item.name] = item.value;
    }
    const serializedData = JSON.stringify(formData);
    fetch("https://teamwork-backends.herokuapp.com/api/v1/auth/user", {
      method: "POST",
      body: serializedData,
      headers: {
        "Access-Version": 1.5,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(({data}) => this.setState({ success: data.message }))
      .catch(error => this.setState({ error: error.message }));
      
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {this.state.success ||  this.state.error}
            <form className="" onSubmit={this.handleSubmit} name="User">
              <p>
                <label htmlFor="employeeid">
                  Employee ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  type="text"
                  id="employeeid"
                  name="employeeid"
                  placeholder="Employee ID"
                />
              </p>
              <p>
                <label htmlFor="firstname">
                  First Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                />
              </p>
              <p>
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control"
                />
              </p>
              <p>
                <label htmlFor="email">
                  Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </p>
              <p>
                <label htmlFor="password">
                  Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </p>
              <p>
                <label htmlFor="gender">
                  Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input type="radio" name="gender" value="male"/>&nbsp;&nbsp;&nbsp;
                Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" name="gender" value="female"/>&nbsp;&nbsp;&nbsp;
                Female
              </p>
              <p>
                <label htmlFor="jobrole">
                  Job Role: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <textarea
                  rows="8"
                  cols="70"
                  placeholder="Job Role"
                  name="jobrole"
                  id="jobrole"
                ></textarea>
              </p>
              <p>
                <label htmlFor="department">
                  Department:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <select name="department" id="department">
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Financial And Accounting">
                    Financial And Accounting
                  </option>
                  <option value="Admin">Administration</option>
                  <option value="Health">Health Care</option>
                  <option value="Social">Social Workers</option>
                  <option value="Security" defaultValue>
                    Security
                  </option>
                  <option value="Procurement">Procurement</option>
                  <option value="Human Resource">Human Resource</option>
                  <option value="Driver">Driver</option>
                  <option value="Publicity">Publicity</option>
                </select>
              </p>
              <p>
                <label htmlFor="address">
                  Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <textarea
                  rows="8"
                  cols="70"
                  placeholder="Address"
                  name="address"
                  id="address"
                ></textarea>
              </p>
              <p>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticle;
