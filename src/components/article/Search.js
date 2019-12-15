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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
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
   await fetch(`https://teamwork-backends.herokuapp.com/api/v1/articles/${parseInt(id)}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
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

  async handleDelete(event) {
    event.preventDefault();
    const item = event.target;
    const id = parseInt(item.id);
    console.log(id);
    await fetch(`https://teamwork-backends.herokuapp.com/api/v1/articles/comments/${id}/flag`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          const { message } = data;
          this.setState({ deleteMessage: message });
        }
      })
      .catch(error => console.error(error));
  }

  async handleEdit(event) {}

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
        <div className="row" style={{ marginTop: "70px" }}>
          <dl className="col-md-12" style={{ textAlign: "center" }}>
            <dt>DATE POSTED</dt>
            <dd>{article.createdOn}</dd>
            <dt>TITLE OF ARTICLE</dt>
            <dd>{article.title}</dd>
            <dd>
              <h5 style={{ color: "orange", marginTop: "30px" }}>
                <i>
                  <em>{message}</em>
                </i>
              </h5>
            </dd>
          </dl>
        </div>
      );
    }
    return (
      <div className="row">
        <dl className="col-md-12" style={{ textAlign: "center" }}>
          <dt>Date Posted</dt>
          <dd>{article.createdOn}</dd>
          <dt>Title of article</dt>
          <dd>{article.title}</dd>
        </dl>
        {comments.map(item => {
          return (
            <dl
              key={item.commentId}
              className="col-md-12 "
              style={{ paddingLeft: "30px", marginTop: "10px" }}
            >
              <dt>Comment ID</dt>
              <dd>{item.commentId}</dd>
              <dt>Comment</dt>
              <dd>{item.comment}</dd>
              <dt>Author ID</dt>
              <dd>{item.authorId}</dd>
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
                <button
                  name="edit"
                  className="col"
                  onClick={this.handleEdit}
                  style={{ display: "none" }}
                >
                  Edit
                </button>
                <button
                  name="delete"
                  className="col"
                  onClick={this.handleDelete}
                  style={{ display: "none" }}
                  id={item.commentId}
                >
                  Delete
                </button>
              </div>

              <hr style={{ backgroundColor: "#383838" }} />
            </dl>
          );
        })}
      </div>
    );
  }
}

export default SearchArticle;
