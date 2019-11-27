import React from "react";


class Header extends React.Component {
  render() {
    const name = "John";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 Logo">
            <img
              src="/images/handpainted.png"
              alt="Logo"
              className="img rounded d-block img-fluid"
            />
          </div>
          <div className="col-5 SiteName">
            <h1
              style={{ marginBottom: "0", textAlign: "center" }}
              className="h1"
            >
              Teamwork
            </h1>
            <p>
              <span style={{ textAlign: "center" }}>
                <strong>
                  Motto: <i>Fostering cooperation among employees</i>
                </strong>
              </span>
            </p>
            <p style={{ textAlign: "center" }}>
              <span className="label">
                Welcome {name} <button type="submit">Logout</button>
              </span>
            </p>
          </div>
          <div className="col-4 UserImage">
            <p>
              <img
                src="/images/IMAG0078.jpg"
                alt="user"
                className="img rounded"
              />
            </p>
            <form className="">
              <input type="file" name="image" className="form-control" />

              <button type="submit" className="btn btn-secondary form-control">
                Upload
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <form
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "10px",
                color: "black",
                paddingLeft: "75px"
              }}
            >
              <input
                type="Search"
                name="search"
                placeholder="ArticleId or GifId"
                          />
                            <button type="submit" className="btn btn-secondary btn-sm">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
