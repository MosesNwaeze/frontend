import React from "react";
import { withRouter } from "react-router-dom";

class GifComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      data: null
    };
    this.createComment = this.createComment.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
  }

  createComment(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    if (isNaN(id)) {
      console.error(`wrong id format ${id}`);
      return;
    }

    const elements = document.querySelector(`form[name = "gif-comment"]`)
      .elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      formData[item.name] = item.value;
    }
    const serializedData = JSON.stringify(formData);

    fetch(`https://teamwork-backends.herokuapp.com/api/v1/gifs/${id}/comment`, {
      method: "POST",
      body: serializedData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(({ status, data }) => {
        if (status === "success") {
          this.setState({ message: data.message });
          this.setState({ data });
        } else {
          this.setState({ message: data.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { message } = this.state;
    return (
      <div className="container">
        <div className="col-md-12">
          <h1
            className="display-5 font-weight-bolder mt-5 mb-4"
            style={{ color: "#2B0639" }}
          >
            Compose Your Comment
          </h1>
          <hr style={{ backgroundColor: "white" }} />
          <h3 className="display-5 font-weight-bolder mt-3 text-success">
            {message}
          </h3>
        </div>
        <div className="col-md-12">
          <form
            name="gif-comment"
            onSubmit={this.createComment}
            className="was-validated"
          >
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                rows="8"
                cols="70"
                placeholder="Comment here..."
                name="comment"
                id="comment"
                className="form-control"
                required
              ></textarea>
            </div>{" "}
            <div className="form-group">
              <button
                type="submit"
                className="btn  form-control"
                style={{ color: "white", background: "#46216D" }}
              >
                Create Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(GifComment);
