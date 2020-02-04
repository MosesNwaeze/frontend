import React from "react";
import { withRouter } from "react-router-dom";

class DeleteArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    this.handleDelete();
  }

  async handleDelete() {
    const { id } = this.props.match.params;
    await fetch(
      `https://teamwork-backends.herokuapp.com/api/v1/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Version": 1.5
        }
      }
    )
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12 display-5 font-weight-bolder mt-5 mb-4">
            <h1 className="text-success">{this.state.message}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DeleteArticle);
