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
        <div className="row" style={{ marginTop: "70px" }}>
          <dl className="col-md-12" style={{ textAlign: "center" }}>
            <dt>DATE POSTED</dt>
            <dd>{gif.createdOn}</dd>
            <dt>TITLE OF GIF</dt>
            <dd>{gif.title}</dd>
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
        <dl
          className="col-md-12"
          style={{ textAlign: "left", paddingLeft: "30px" }}
        >
          <dt>Date Posted</dt>
          <dd>{gif.createdOn}</dd>
          <dt>Title of article</dt>
          <dd>{gif.title}</dd>
          <hr style={{ backgroundColor: "#383838" }} />
        </dl>
        {comments.map(item => {
          return (
            <dl
              key={item.commentId}
              className="col-md-12 start"
              style={{ paddingLeft: "30px", marginTop: "10px" }}
            >
              <dt>Comment ID</dt>
              <dd>{item.commentId}</dd>
              <dt>Comment</dt>
              <dd>{item.comment}</dd>
              <dt>Author ID</dt>
              <dd>{item.authorId}</dd>
              <button onClick={this.flagButton} name={item.commentId}>
                FLAG OFF
              </button>
              <hr style={{ backgroundColor: "#383838" }} />
            </dl>
          );
        })}
      </div>
    );
  }
}

export default SearchGif;
