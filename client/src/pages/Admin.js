import React from 'react';
import axios from 'axios';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050',
      name: '',
      adress: '',
      description: '',
      latlng: ''
    }
  }

  AddPlace() {
    axios.post(`${this.state.serverHost}/admin/places/add`, {
      name: this.state.name,
      adress: this.state.adress,
      latlng: this.state.latlng,
      description: this.state.description,
    })
  }

  render() {
    return (
      <div className='container ml-auto'>
        <form onSubmit={this.AddPlace}>
          <input type="text" value="eee" onChange={e => this.setState({name: e.currentTarget.value})} />
          <input type="text" onChange={e => this.setState({adress: e.currentTarget.value})} />
          <br />
          <input type="text" onChange={e => this.setState({latlng: e.currentTarget.value})} />
          <input type="text" onChange={e => this.setState({description: e.currentTarget.value})} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}