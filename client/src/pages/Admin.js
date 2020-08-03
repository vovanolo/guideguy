import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      address: '',
      lat: '',
      lng: '',
      imageUrl: '',
      description: '',
      places: []
    }
  }
  
  ViewPlaces() {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/places`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    }).then(res => this.setState({places: res.data}))
  }

  AddPlace(e) {
    e.preventDefault();
    const latlng = this.state.lat + ',' + this.state.lng;
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/places`, {
      name: this.state.name,
      address: this.state.address,
      latlng: latlng,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    }).then(res => this.setState({ places: [...this.state.places, res.data] }));
  }

  DeletePlace() {
    axios.delete(`${process.env.REACT_APP_SERVER_HOST}/places/${this.state.id}`);
  }

  SeedPlaces() {
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/admin/seed/places`, { count: 5 });
  }

  componentDidMount() {
    this.ViewPlaces();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="mt-3">Admin</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={e => this.AddPlace(e)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  onChange={e => this.setState({ name: e.currentTarget.value })} />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address"
                  onChange={e => this.setState({ address: e.currentTarget.value })} />
              </div>
              
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                    className="form-control"
                    type="number"
                    placeholder="Latitude"
                    onChange={e => this.setState({ lat: e.currentTarget.value })} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                    className="form-control"
                    type="number"
                    placeholder="Longitude"
                    onChange={e => this.setState({ lng: e.currentTarget.value })} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="url"
                  placeholder="Image URL"
                  onChange={e => this.setState({ imageUrl: e.currentTarget.value })} />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  onChange={e => this.setState({ description: e.currentTarget.value })} />
              </div>
              <input type="submit" className="btn btn-primary" value="Add place" />
            </form>

            <button
              type="button"
              className="btn btn-secondary mt-3 mb-3"
              onClick={this.SeedPlaces}>
              Seed places
            </button>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <th scope="col" align="left">Id</th>
                <th scope="col" align="right">Name</th>
                <th scope="col" align="right">Address</th>
                <th scope="col" align="right">LatLng</th>
                <th scope="col" align="right">Actions</th>
              </thead>
              <tbody>
                {[{ name: 1, address: 1, lat: 1, lng: 1 },
                  { name: 2, address: 2, lat: 2, lng: 2 },
                  { name: 3, address: 3, lat: 3, lng: 3 }]
                    .reverse().map((place, index) => {
                      place.id = index;
                      return (
                        <tr key={place.id}>
                          <th scope="row" align="left">{place.id}</th>
                          <td align="right">{place.name}</td>
                          <td align="right">{place.address}</td>
                          <td align="right">{place.lat + ',' + place.lng}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link
                                to={`/place/${place.id}`}
                                className="btn btn-primary">
                                  View
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={this.DeletePlace(place.id)}>
                                  Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}