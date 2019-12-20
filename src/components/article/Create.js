import React from "react";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.location = "/#/";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const elements = document.querySelector(`form[name = 'article']`).elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      formData[item.name] = item.value;
    }
    const serializedData = JSON.stringify(formData);
    fetch("https://teamwork-backends.herokuapp.com/api/v1/article", {
      method: "POST",
      body: serializedData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(({ data }) => this.setState({ message: data.message }))
      .catch(error => this.setState({ error: error.message }));
    return;
  }
  render() {
    return (
      <div className="container">
        <h1
          className="display-5 font-weight-bolder mt-5 mb-4"
          style={{ color: "#2B0639" }}
        >
          Compose Your Article
        </h1>
        <hr style={{ backgroundColor: "white" }} />
        <h4 className="display-5 font-weight-bolder text-center text-success">
          {this.state.message}
        </h4>
        <form
          name="article"
          onSubmit={this.handleSubmit}
          className="was-validated"
        >
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Article Title"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              rows="8"
              cols="70"
              placeholder="Article Body"
              name="body"
              id="body"
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn  form-control"
              style={{ background: "#46216D" }}
            >
              Create Article
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateArticle;
