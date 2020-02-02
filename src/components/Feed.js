import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: "",
      flagMessage: "",
      articleStatus: false,
      gifStatus: false,
      isFlagged: false
    };

    this.chechUser = this.chechUser.bind(this);
    this.getFeed = this.getFeed.bind(this);
    this.handleArticleFlag = this.handleArticleFlag.bind(this);
    this.handleGifFlag = this.handleGifFlag.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem("token") === null) {
      history.push("/");
    }
    this.getFeed();
  }

  chechUser() {
    const currentUser = localStorage.getItem("email");
    const isValid = this.state.data.some(item => item.email === currentUser);

    if (isValid) {
      const items = document.querySelectorAll(`p[name="delete"]`);
      const flags = document.querySelectorAll(`button[name="flag"]`);
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === currentUser) {
          items[i].style.display = "block";
        }
      }
      for (let i = 0; i < flags.length; i++) {
        if (flags[i].id === currentUser) {
          flags[i].style.display = "none";
        }
      }
    }
  }

  async getFeed() {
    await fetch("https://teamwork-backends.herokuapp.com/api/v1/feed", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Accept-Version": 1.5
      }
    })
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch(error => this.setState({ error: error.message }));
    this.chechUser();
  }

  async handleArticleFlag(event) {
    event.preventDefault();
    const article = await event.target;
    const articleId = await article.getAttribute("author");
    await this.setState({ articleStatus: !this.state.articleStatus });

    if (this.state.articleStatus) {
      await fetch(
        `https://teamwork-backends.herokuapp.com/api/v1/articles/${articleId}/flag`,
        {
          method: "POST",
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
            this.setState({ flagMessage: message });
            this.setState({ isFlagged: true });
            article.style.color = "white";
            article.style.backgroundColor = "red";
          }
        })
        .catch(error => console.error(error));
    } else {
      // implement flag off method
      article.style.color = "red";
      article.style.backgroundColor = "white";
    }
  }

  async handleGifFlag(event) {
    event.preventDefault();
    const gif = event.target;
    const gifId = gif.getAttribute("author");
    await this.setState({ gifStatus: !this.state.gifStatus });

    if (this.state.gifStatus) {
      await fetch(
        `https://teamwork-backends.herokuapp.com/api/v1/gifs/${gifId}/flag`,
        {
          method: "POST",
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
            this.setState({ flagMessage: message });
            this.setState({ isFlagged: true });
            gif.style.color = "white";
            gif.style.backgroundColor = "red";
          }
        })
        .catch(error => console.error(error));
    } else {
      // implement flag off method
      gif.style.color = "red";
      gif.style.backgroundColor = "white";
    }
  }

  render() {
    const { data } = this.state;
    const pathSearchArticle = "/app/search-article/";
    const pathSearchGif = "/app/search-gif/";
    return (
      <div className="row">
        <div className="col-md-12 mb-4">
          <h1
            className="display-5 font-weight-bolder mt-5 mb-4"
            style={{ color: "#2B0639" }}
          >
            Current Feeds
          </h1>
          <hr style={{ backgroundColor: "white" }} />
        </div>
        <dl className="col-md-12 dl">
          {data.map(item => {
            return (
              <div key={item.id} className="mt-2">
                <div className="row">
                  <div className="col-md-12">
                    <dt>Title</dt>
                    <dd>{item.title}</dd>
                    <dt>Content</dt>
                    <dd>
                      {item.body.substr(0, 4) === "http" ? (
                        <img
                          style={{ height: "150px", width: "150px" }}
                          src={item.body}
                          alt={item.authorId}
                        />
                      ) : (
                        item.body
                      )}
                    </dd>
                  </div>
                </div>

                <div className="row">
                  <p className="col">
                    {item.body.substr(0, 4) === "http" ? (
                      <Router>
                        <Link to={"/app/comment-gif/" + item.authorId}>
                          Comment
                        </Link>
                      </Router>
                    ) : (
                      <Router>
                        <Link to={"/app/comment-article/" + item.authorId}>
                          Comment
                        </Link>
                      </Router>
                    )}
                  </p>
                  <p className="col">
                    {item.body.substr(0, 4) === "http" ? (
                      <Router>
                        <Link to={pathSearchGif + item.authorId}>
                          View Detail
                        </Link>
                      </Router>
                    ) : (
                      <Router>
                        <Link
                          className="link"
                          to={pathSearchArticle + item.authorId}
                        >
                          View Detail
                        </Link>
                      </Router>
                    )}
                  </p>
                  <p
                    className="col"
                    name="delete"
                    style={{ display: "none" }}
                    id={item.email}
                  >
                    {item.body.substr(0, 4) === "http" ? (
                      <Router>
                        <Link to={"/app/delete-gif/" + item.authorId}>
                          Delete
                        </Link>
                      </Router>
                    ) : (
                      <Router>
                        <Link to={"/app/delete-article/" + item.authorId}>
                          Delete
                        </Link>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        {localStorage.setItem("articleTitle", item.title)}
                        {localStorage.setItem("articleBody", item.body)}
                        <Link to={"/app/edit-article/" + item.authorId}>
                          Edit
                        </Link>
                      </Router>
                    )}
                  </p>
                  <p className="col">
                    {item.body.substr(0, 4) === "http" ? (
                      <button
                        onClick={this.handleGifFlag}
                        id={item.email}
                        name="flag"
                        author={item.authorId}
                        style={{ backgroundColor: "white", color: "red" }}
                      >
                        Flag
                      </button>
                    ) : (
                      <button
                        onClick={this.handleArticleFlag}
                        id={item.email}
                        name="flag"
                        author={item.authorId}
                        style={{ backgroundColor: "white", color: "red" }}
                      >
                        Flag
                      </button>
                    )}
                  </p>
                </div>
                <hr style={{ backgroundColor: "white" }} />
              </div>
            );
          })}
        </dl>
      </div>
    );
  }
}

export default Feed;
