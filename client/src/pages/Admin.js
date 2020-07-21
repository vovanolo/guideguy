import React from 'react';
import axios from 'axios';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050',
      adress: '',
      latlng: ''
    }
  }

  AddPlace() {
    axios.post(`${this.state.serverHost}/admin/places/add`, {
      adress: this.state.adress,
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.AddPlace}>
          <input type="text" onChange={e => this.setState({adress: e.currentTarget.value})} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}