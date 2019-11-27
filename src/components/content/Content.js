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

class Content extends React.Component {
    
  render() {
    return (
      <div className="Content">
        <Router>
          <Switch>
            <Route path="/feed" component={Feed} />
            <Route path="/create-article" component={CreateArticle} />
            <Route path="/edit-article" component={EditArticle} />
            <Route path="/delete-article" component={DeleteArticle} />
            <Route path="/create-gif" component={CreateGif} />
            <Route path="/delete-gif" component={DeleteGif} />
            <Route path="/search-article" component={SearchArticle} />
            <Route path="/search-gif" component={SearchGif} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Content;
