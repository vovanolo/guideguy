import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.SignUpUser = this.SignUpUser.bind(this);
  }

  SignUpUser(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="container content-center">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Sign Up</h1>
            <form onSubmit={(e) => this.SignUpUser(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  onChange={(e) =>
                    this.setState({ name: e.currentTarget.value })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="username"
                  className="form-control"
                  onChange={(e) =>
                    this.setState({ username: e.currentTarget.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ password: e.currentTarget.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    placeholder="repeat password"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ repeatPassword: e.currentTarget.value })
                    }
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
