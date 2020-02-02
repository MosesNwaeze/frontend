import React from "react";

class SearchArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      errors: "",
      comments: [],
      message: "",
      status: false,
      flag: "",
      deleteMessage: "",
      editMessage: ""
    };
    this.getArticle = this.getArticle.bind(this);
    this.flagButton = this.flagButton.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    const { id } = this.props.match.params;
    this.getArticle(id);
  }

  checkUser() {
    const email = localStorage.getItem("email");
    const validUser = this.state.comments.some(item => item.authorId === email);

    if (validUser) {
      const deleteButtons = document.querySelectorAll(`button[name="delete"]`);
      const editButtons = document.querySelectorAll(`button[name="edit"]`);
      const flagButtons = document.querySelectorAll(`button[id="flag"]`);
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "block";
        editButtons[i].style.display = "block";
        flagButtons[i].style.display = "none";
      }
    }
  }

  async getArticle(id) {
    await fetch(
      `https://teamwork-backends.herokuapp.com/api/v1/articles/${parseInt(id)}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Version": 1.5
        }
      }
    )
      .then(response => response.json())
      .then(({ status, data, error }) => {
        if (status === "success") {
          const { comments } = data;
          this.setState({ comments });
          this.setState({ article: data });
        } else if (status === "error") {
          this.setState({ article: data });
          this.setState({ message: error.message });
        }
        this.checkUser();
      })
      .catch(error => console.error(error));
  }
  async flagButton(event) {
    const item = event.target;
    const commentId = item.name;
    await this.setState({ status: !this.state.status });
    const { status } = this.state;

    if (status) {
      item.textContent = "FLAG ON";
      await fetch(
        `https://teamwork-backends.herokuapp.com/api/v1/articles/comments/${commentId}/flag`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Accept-Version": 1.5
          }
        }
      )
        .then(response => response.json())
        .then(({ data }) => this.setState({ flag: data.message }))
        .catch(error => console.error(error));
      item.style.backgroundColor = "red";
      item.style.color = "white";
    } else {
      //implement in the next version that remove an item from the flag relation
      item.textContent = "FLAG OFF";
      item.style.color = "red";
      item.style.backgroundColor = "white";
    }
  }

  render() {
    const { comments } = this.state;
    const { article } = this.state;
    const { message } = this.state;
    if (message) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1
                className="display-5 font-weight-bolder mt-5 mb-4"
                style={{ color: "#2B0639" }}
              >
                Reactions on Article
              </h1>
              <hr style={{ backgroundColor: "white" }} />
            </div>
            <dl className="col-md-12 dl">
              <dt style={{ color: "#6338B0" }}>DATE POSTED</dt>
              <dd>{article.createdOn}</dd>
              <dt style={{ color: "#6338B0" }}>TITLE OF ARTICLE</dt>
              <dd>{article.title}</dd>
              <dd>
                <h5 className="mt-2" style={{ color: "#F8A300" }}>
                  <i>
                    <em>{message}</em>
                  </i>
                </h5>
              </dd>
            </dl>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="display-5 font-weight-bolder mt-5 mb-4"
              style={{ color: "#2B0639" }}
            >
              Reactions on Article
            </h1>
            <hr style={{ backgroundColor: "white" }} />
          </div>

          <dl className="col-md-12 dl">
            <dt
              className="display-5 font-weight-bolder h4"
              style={{ color: "#2B0639" }}
            >
              DATE POSTED
            </dt>
            <dd className="font-weight-lighter text-monospace h3">
              {article.createdOn}
            </dd>
            <dt
              className="display-5 font-weight-bolder h4"
              style={{ color: "#2B0639" }}
            >
              TITLE OF ARTICLE
            </dt>
            <dd className="font-weight-lighter text-monospace h3">
              {article.title}
            </dd>
            <hr style={{ backgroundColor: "white" }} />
          </dl>
          {comments.map(item => {
            return (
              <dl key={item.commentId} className="col-md-12 ">
                <dt
                  style={{ color: "#6338B0" }}
                  className="display-5 font-weight-bolder h4"
                >
                  Comment ID
                </dt>
                <dd className="font-weight-lighter text-monospace h3">
                  {item.commentId}
                </dd>
                <dt
                  style={{ color: "#6338B0" }}
                  className="display-5 font-weight-bolder h4 text-break"
                >
                  Comment
                </dt>
                <dd className="font-weight-lighter text-monospace h3">
                  {item.comment}
                </dd>
                <dt
                  style={{ color: "#6338B0" }}
                  className="display-5 font-weight-bolder h4"
                >
                  Author ID
                </dt>
                <dd className="font-weight-lighter text-monospace h3">
                  {localStorage.getItem("firstname") +
                    " " +
                    localStorage.getItem("lastname")}
                </dd>
                <div
                  className="row"
                  style={{ marginLeft: "3px", marginRight: "15px" }}
                >
                  <button
                    onClick={this.flagButton}
                    name={item.commentId}
                    id="flag"
                    className="col"
                    style={{ color: "red", backgroundColor: "white" }}
                  >
                    FLAG OFF
                  </button>
                </div>

                <hr style={{ backgroundColor: "white" }} />
              </dl>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchArticle;
