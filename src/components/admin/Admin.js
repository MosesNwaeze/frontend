/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { HashRouter as Router, Link, withRouter } from "react-router-dom";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flags: [],
      message: "",
      clear: "",
      clearError: "",
      activites: false
    };

    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    fetch("https://teamwork-backends.herokuapp.com/api/v1/flags", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          this.setState({ flags: data.data });
        } else {
          this.setState({ message: data.message });
        }
      })
      .catch(error => console.error(error));
  }

  async handleClear() {
    await fetch("https://teamwork-backends.herokuapp.com/api/v1/flags", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          this.setState({ clear: data.data });
          this.setState({ flags: [] });
        } else {
          this.setState({ clearError: data.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { flags } = this.state;
    let article = [];
    let gif = [];
    let articleComment = [];
    let gifComment = [];
    let index = 0;

    for (let i = 0; i < flags.length; i++) {
      if (flags[i].article) {
        article.push(flags[i].article);
      } else if (flags[i].gif) {
        gif.push(flags[i].gif);
      } else if (flags[i].articlecomment) {
        articleComment.push(flags[i].articlecomment);
      } else if (flags[i].gifcomment) {
        gifComment.push(flags[i].gifcomment);
      }
    }
    const length = [
      article.length,
      gif.length,
      articleComment.length,
      gifComment.length
    ];
    const max = Math.max(...length);
    let counter = 1;
    return (
      <div className="container-fluid mt-2">
        <div id="page-top">
          {/** Page Wrapper **/}
          <div id="wrapper">
            {/** Content Wrapper **/}
            <div id="content-wrapper" className="d-flex flex-column">
              {/** Main Content **/}
              <div id="content">
                {/** Topbar **/}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                  {/** Sidebar Toggle (Topbar) **/}
                  <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                  >
                    <i className="fa fa-bars"></i>
                  </button>

                  <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                    <button className="btn " type="button">
                      <Router>
                        <Link
                          to="/admin/create-account"
                          className="nav-link bg-white"
                        >
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                          Create Account
                        </Link>
                      </Router>
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn  " type="button">
                      <Router>
                        <Link to="" className="nav-link bg-white">
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                          Logout
                        </Link>
                      </Router>
                    </button>
                  </form>

                  {/** Topbar Navbar **/}
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item no-arrow"></li>
                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/** Nav Item - User Information **/}
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                          Welcome {localStorage.getItem("lastname")}
                        </span>
                        <img
                          className="img-profile rounded-circle"
                          src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                        />
                      </a>
                    </li>
                  </ul>
                </nav>
                {/** End of Topbar **/}

                {/** Begin Page Content **/}
                <div className="container-fluid">
                  {/** Page Heading **/}
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  </div>

                  {/** Content Row **/}
                  <div className="row">
                    {/** Article Flags**/}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Article (flags)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {article.length}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** Earnings (Monthly) Card Example **/}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Gif (Flags)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {gif.length}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** Earnings (Monthly) Card Example **/}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Article Comments (Flags)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {articleComment.length}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** Earnings (Monthly) Card Example **/}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Gif comments (flags)
                              </div>
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                    {gifComment.length}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/** Content Row **/}

                  <div className="row">
                    {/** Area Chart **/}
                    <div className="col-xl-12 nav-link bg-white">
                      <div className="card shadow mb-4">
                        {/**  Card Header - Dropdown **/}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <div className="col-md-6">
                            <h6 className="m-0 font-weight-bold text-primary">
                              Flags Activities
                            </h6>
                            <p style={{ color: "green" }}>{this.state.clear}</p>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "end" }}
                          >
                            <button
                              className="m-0 font-weight-bold text-primary btn"
                              onClick={this.handleClear}
                            >
                              <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
                              Clear Activities
                            </button>
                          </div>
                        </div>

                        {/** Card Body **/}
                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              className="table table-bordered"
                              id="dataTable"
                              width="100%"
                              cellSpacing="0"
                            >
                              <thead>
                                <tr>
                                  <th>S/N</th>
                                  <th>Article </th>
                                  <th>Gif </th>
                                  <th>Article Comment</th>
                                  <th>Gif Comment</th>
                                  <th>Date Flagged</th>
                                </tr>
                              </thead>
                              <tbody>
                                <Router>
                                  {flags.map(item => {
                                    if (max) {
                                      flags.pop();
                                    }
                                    return (
                                      <tr key={item.id}>
                                        <td>{counter++}</td>
                                        <td>{article[index]}</td>
                                        <td>{gif[index]}</td>
                                        <td>{articleComment[index]}</td>
                                        <td>{gifComment[index]}</td>
                                        <td>{item.flaggedon}</td>
                                        <td style={{ display: "none" }}>
                                          {index++}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </Router>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/** /.container-fluid **/}
              </div>
              {/** End of Main Content **/}
            </div>
            {/** End of Content Wrapper **/}
          </div>
          {/** End of Page Wrapper **/}
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);
