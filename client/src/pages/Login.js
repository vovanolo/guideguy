import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.LoginUser = this.LoginUser.bind(this);
  }

  LoginUser(e) {
    e.preventDefault();

    axios.post('http://localhost:3050/auth/login', this.state).then(res => localStorage.setItem('JWT_TOKEN', res.data));
  }

  render() {
    return (
      <div className="container content-center">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Sign In</h1>
            <form onSubmit={e => this.LoginUser(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="username"
                  className="form-control"
                  onChange={e => this.setState({ username: e.currentTarget.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="password"
                  className="form-control"
                  onChange={e => this.setState({ password: e.currentTarget.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}