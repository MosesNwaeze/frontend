import React from "react";

class CreateGif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector(`form[name="gif"]`));
    const formD = new FormData();
    formD.append("image", this.state.file);
    formD.append("title", formData.get("title"));

    fetch(`https://teamwork-backends.herokuapp.com/api/v1/gifs`, {
      method: "POST",
      body: formD,
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
          this.setState({ message: data.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", fontWeight: "bold", color: "green" }}>
          {this.state.message}
        </h1>
        <h1 style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
          Select Your Gif Image
        </h1>
        <hr style={{ background: "black" }} />
        <form
          name="gif"
          onSubmit={this.handleSubmit}
          className="form-group files"
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="form-control"
          />
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={this.handleChange}
          />

          <button type="submit" className="btn btn-success btn-block">
            Post Image
          </button>
        </form>
      </div>
    );
  }
}

export default CreateGif;
