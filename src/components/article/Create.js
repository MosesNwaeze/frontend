import React from "react";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div className="container-fluid">
        <h3 className="h3" style={{ textAlign: "center" }}>
          Compose Your Article
        </h3>
        <h4 className="h4 success" style={{ textAlign: "center" }}>
          {this.state.message}
        </h4>
        <form name="article" onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="title">Title:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              id="title"
            />
          </p>
          <p>
            <label htmlFor="body">Body:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <textarea
              name="body"
              placeholder="Article Body"
              id="body"
              rows="10"
              cols="70"
            />
          </p>
          <p>
            <button type="submit">Send Article</button>
            <button type="reset">Reset Article</button>
          </p>
        </form>
      </div>
    );
  }
}

export default CreateArticle;
