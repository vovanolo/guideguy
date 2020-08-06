import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
    };

    this.SignUpUser = this.SignUpUser.bind(this);
  }

  SignUpUser(e) {
    e.preventDefault();

    const { username, password, repeatPassword } = this.state;

    if (repeatPassword !== password) {
      alert('Passwords must match');
      return;
    }
    const user = { username, password };
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/auth/signup`, user)
      .then(res => {
        localStorage.setItem('JWT_TOKEN', res.data.token);
        this.props.updateJwtToken();
      })
      .catch(err => console.log(err));
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
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign Up" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
