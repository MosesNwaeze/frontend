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

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
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
        <h1
          className="display-5 font-weight-bolder mt-5 mb-4"
          style={{ color: "#2B0639" }}
        >
          Compose Your Gif
        </h1>
        <hr style={{ background: "white" }} />
        <h4 className="display-5 font-weight-bolder text-center text-success">
          {this.state.message}
        </h4>
        <form name="gif" onSubmit={this.handleSubmit} className="was-validated">
          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Article Title"
              className="form-control"
              required
            />
          </div>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              name="image"
              id="image"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="image" className="custom-file-label">
              {" "}
              Choose File
            </label>
          </div>
          <button
            type="submit"
            className="btn form-control"
            style={{ color: "white", background: "#46216D" }}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default CreateGif;
