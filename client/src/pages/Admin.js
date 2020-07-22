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

  AddPlace(e) {
    e.preventDefault();
    axios.post(`${this.state.serverHost}/admin/places/add`, {
      name: this.state.name,
      adress: this.state.adress,
      latlng: this.state.latlng,
      description: this.state.description,
    }).then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="container ml-auto">
        <form onSubmit={e => this.AddPlace(e)}>
          <input type="text" defaultValue="eee" placeholder="Name" onChange={e => this.setState({name: e.currentTarget.value})} />
          <input type="text" placeholder="Adress" onChange={e => this.setState({adress: e.currentTarget.value})} />
          <br />
          <input type="text" placeholder="Lat. Lng." onChange={e => this.setState({latlng: e.currentTarget.value})} />
          <textarea type="text" placeholder="Description" onChange={e => this.setState({description: e.currentTarget.value})} />
          <input type="submit" value="Додати місце" />
        </form>
      </div>
    );
  }
}