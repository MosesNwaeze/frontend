import React from "react";

class SearchGif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: {},
      errors: "",
      comments: [],
      message: "",
      status: false,
      flag: "",
      button: "OFF"
    };
    this.getGif = this.getGif.bind(this);
    this.flagButton = this.flagButton.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    const { id } = this.props.match.params;
    this.getGif(id);
  }

  getGif(id) {
    fetch(`https://teamwork-backends.herokuapp.com/api/v1/gifs/${parseInt(id)}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ status, data, error }) => {
        if (status === "success") {
          console.log(status);
          const { comments } = data;
          this.setState({ comments });
          this.setState({ gif: data });
          console.error(data);
        } else if (status === "error") {
          this.setState({ gif: data });
          this.setState({ message: error.message });
        }
      })
      .catch(error => console.error(error));
  }

  async flagButton(event) {
    const item = event.target;
    const commentId = item.name;
    await this.setState({ status: !this.state.status });
    const { status } = this.state;
    const span = document.createElement("span");
    if (status) {
      item.textContent = "FLAG ON";
      await fetch(
        `https://teamwork-backends.herokuapp.com/api/v1/gifs/comments/${commentId}/flag`,
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
        .catch(error => console.log(error));
      span.style.color = "red";
      span.style.paddingLeft = "15px";
      span.innerHTML = await this.state.flag;
      item.insertAdjacentElement("afterend", span);
    } else {
      //implement in the next version that remove an item from the flag relation
      item.textContent = "FLAG OFF";
      item.nextElementSibling.remove();
    }
  }

  render() {
    const { comments } = this.state;
    const { gif } = this.state;
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
                Reactions on Gif
              </h1>
              <hr style={{ backgroundColor: "white" }} />
            </div>
            <dl className="col-md-12 dl">
              <dt style={{ color: "#6338B0" }}>DATE POSTED</dt>
              <dd>{gif.createdOn}</dd>
              <dt style={{ color: "#6338B0" }}>TITLE OF ARTICLE</dt>
              <dd>{gif.title}</dd>
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
              Reactions on Gif
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
              {gif.createdOn}
            </dd>
            <dt
              className="display-5 font-weight-bolder h4"
              style={{ color: "#2B0639" }}
            >
              TITLE OF ARTICLE
            </dt>
            <dd className="font-weight-lighter text-monospace h3">
              {gif.title}
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

                <hr style={{ backgroundColor: "white" }} />
              </dl>
            );
          })}
        </div>
      </div>

    );
  }
}

export default SearchGif;
