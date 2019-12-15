import React from "react";

class DeleteArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.handleDelete();
  }

  async handleDelete() {
    const { id } = this.props.match.params;
    await fetch(`https://teamwork-backends.herokuapp.com/api/v1/articles/${id}`, {
      method: "DELETE",
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
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div
        style={{
          marginTop: "40px",
          color: "green",
          fontWeight: "bold",
          backgroundColor: "white",
          textAlign: "center"
        }}
      >
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default DeleteArticle;
