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
import { withRouter } from "react-router-dom";

class Content extends React.Component {
  render() {
    
    return (
      <div className="Content">
        <Router>
          <div>
            <Switch>
              <Route path="/frontend/feed" component={Feed} />
              <Route path="/frontend/create-article" component={CreateArticle} />
              <Route path="/frontend/edit-article/:id" component={EditArticle} />
              <Route path="/frontend/delete-article/:id" component={DeleteArticle} />
              <Route path="/frontend/create-gif" component={CreateGif} />
              <Route path="/frontend/delete-gif/:id" component={DeleteGif} />
              <Route path="/frontend/search-article/:id" component={SearchArticle} />
              <Route path="/frontend/search-gif/:id" component={SearchGif} />
              <Route path="/frontend/comment-gif/:id" component={GifComment} />
              <Route
                path="/frontend/comment-article/:id"
                component={ArticleComment}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(Content);
