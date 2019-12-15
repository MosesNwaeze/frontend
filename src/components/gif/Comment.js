import React from "react";

class GifComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      data: []
    };
    this.createComment = this.createComment.bind(this);
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
          const [message] = data;
          this.setState({ message: message.message });
          this.setState({ data: message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { message } = this.state;
    return (
      <div className="container">
        <div className="col-md-12">
          <h3
            style={{
              color: "green",
              marginBottom: "30px",
              marginTop: "20px",
              fontWeight: "bold",
              backgroundColor: "white"
            }}
          >
            {message}
          </h3>
          <h3
            style={{
              color: "black",
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            Compose your comment
          </h3>
        </div>
        <div className="col-md-12">
          <form name="gif-comment" onSubmit={this.createComment}>
            <p>
              <label
                htmlFor="comment"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Type comment:&nbsp;&nbsp;&nbsp;
              </label>
              <textarea
                name="comment"
                id="comment"
                placeholder="comment here..."
                rows="10"
                cols="60"
              ></textarea>
            </p>
            <p>
              <button type="submit">Post Comment</button>
              <button type="reset">Reset</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
export default GifComment;
