import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Feed.js";
import CreateArticle from "../article/Create.js";
import EditArticle from "../article/Edit.js";
import DeleteArticle from "../article/Delete.js";
import CreateGif from "../gif/Create.js";
import DeleteGif from "../gif/Delete.js";
import SearchArticle from "../article/Search.js";
import SearchGif from "../gif/Search.js";
import ArticleComment from "../article/Comment";
import GifComment from "../gif/Comment";

class Content extends React.Component {
  render() {
    return (
      <div className="Content">
        <Router basename="/">
          <div>
            <Switch>
              <Route path="/app/feed" component={Feed} />
              <Route path="/app/create-article" component={CreateArticle} />
              <Route path="/app/edit-article/:id" component={EditArticle} />
              <Route
                path="/app/delete-article/:id/:email"
                component={DeleteArticle}
              />
              <Route path="/app/create-gif" component={CreateGif} />
              <Route path="/app/delete-gif/:id/:email" component={DeleteGif} />
              <Route path="/app/search-article/:id" component={SearchArticle} />
              <Route path="/app/search-gif/:id" component={SearchGif} />
              <Route path="/app/comment-gif/:id" component={GifComment} />
              <Route
                path="/app/comment-article/:id"
                component={ArticleComment}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
