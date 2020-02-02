import React from "react";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    
    this.redirectPath = this.redirectPath.bind(this);
  }
  componentDidMount() {
    localStorage.removeItem("token");
    this.redirectPath();
  }
  redirectPath() {
    const {history} = this.props;
    setInterval(() => {
      history.push('/');
    }, 1000);
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-light py-3 text-center">Logout successful. </h1>
      </div>
    );
  }
}
export default Logout;
