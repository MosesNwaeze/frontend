import React from "react";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      data: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    const elements = document.querySelector(`form[name="edit"]`).elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      formData[item.name] = item.value;
    }
    const serializedData = JSON.stringify(formData);
    await fetch(`https://teamwork-backends.herokuapp.com/api/v1/articles/${id}`, {
      method: "PATCH",
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
          const { message } = data;
          this.setState({ message });
          this.setState({ data });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="row">
        <div
          className="col-md-12"
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            marginBottom: "50px"
          }}
        >
          <h2>Edit article post</h2>
          <h4 style={{color:'green'}}>{this.state.message}</h4>
        </div>
        <div className="col-md-12">
          <form name="edit" onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="title">
                Title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={localStorage.getItem("articleTitle")}
              />
            </p>
            <p>
              <label htmlFor="body">Body:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <textarea
                name="body"
                id="body"
                rows="10"
                cols="70"
                defaultValue={localStorage.getItem("articleBody")}
              ></textarea>
            </p>
            <p>
              <button type="submit">Save Change</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="reset">Reset Entry</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default EditArticle;
