import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.js";
import Header from "./components/header/Header.js";
import Content from "./components/content/Content.js";
import Footer from "./components/footer/Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  render() {
    return (
      <div className="App container">
        <div className="row Header">
          <div className="col-sm-12">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 Sidebar">
            <Sidebar />
          </div>
          <div className="col-sm-9 Content">
            <Content />
          </div>
        </div>
        <div className="row Footer">
          <div className="col-sm-12">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
