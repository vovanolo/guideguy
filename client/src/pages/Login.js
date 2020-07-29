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
      <div>
        <form onSubmit={e => this.LoginUser(e)}>
          <input placeholder="username" onChange={e => this.setState({ username: e.currentTarget.value })} />
          <input placeholder="password" onChange={e => this.setState({ password: e.currentTarget.value })} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}