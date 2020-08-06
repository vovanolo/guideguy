import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwtToken: '',
    }
  }

  updateJwtToken() {
    const token = localStorage.getItem('JWT_TOKEN');
    this.setState({ jwtToken: token });
  }

  logout() {
    localStorage.removeItem('JWT_TOKEN');
    this.updateJwtToken();
  }

  componentDidMount() {
    this.updateJwtToken();
  }

  render() {
    const { jwtToken } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          GuideGuy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <Link to="/map" className="nav-link">
              Map
          </Link>
            {!jwtToken && <Link to="/login" className="nav-link">Sign In</Link>}
            {!jwtToken && <Link to="/signup" className="nav-link">Sign Up</Link>}
            {jwtToken && <button type="button" className="btn btn-danger" onClick={() => this.logout()}>Log out</button>}
          </ul>
        </div>
      </nav>
    );
  }
}
