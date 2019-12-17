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
    await fetch(
      `https://teamwork-backends.herokuapp.com/api/v1/articles/${id}`,
      {
        method: "PATCH",
        body: serializedData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Version": 1.5,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="display-5 font-weight-bolder mt-5 mb-4"
              style={{ color: "#2B0639" }}
            >
              Edit article post
            </h1>
            <hr style={{ backgroundColor: "white" }} />
            <h3 className="display-5 font-weight-bolder mb-3 text-success">
              {this.state.message}
            </h3>
          </div>
          <div className="col-md-12">
            <form
              name="edit"
              onSubmit={this.handleSubmit}
              className="was-validated"
            >
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={localStorage.getItem("articleTitle")}
                  className="form-control form-control-user"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea
                  rows="8"
                  cols="70"
                  defaultValue={localStorage.getItem("articleBody")}
                  name="body"
                  id="body"
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success form-control">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditArticle;
