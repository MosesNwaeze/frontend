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
        <Router>
          <Switch>
            <Route path="/app/feed" component={Feed} exact/>
            <Route path="/app/create-article" component={CreateArticle} exact/>
            <Route path="/app/edit-article/:id" component={EditArticle} exact/>
            <Route
              path="/app/delete-article/:id/:email"
              component={DeleteArticle} exact
            />
            <Route path="/app/create-gif" component={CreateGif} exact/>
            <Route path="/app/delete-gif/:id/:email" component={DeleteGif} exact/>
            <Route path="/app/search-article/:id" component={SearchArticle} exact/>
            <Route path="/app/search-gif/:id" component={SearchGif} exact/>
            <Route path="/app/comment-gif/:id" component={GifComment} exact/>
            <Route path="/app/comment-article/:id" component={ArticleComment} exact/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Content;
