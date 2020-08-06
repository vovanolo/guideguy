import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import qr from 'qrcode';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrUrl: '',
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
    })
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  }

  AddPlace(e) {
    e.preventDefault();
    const latlng = this.state.lat + ',' + this.state.lng;
    axios( {
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_HOST}/places`,
      data: {
        name: this.state.name,
        address: this.state.address,
        latlng: latlng,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    }).then(res => this.setState({ places: [...this.state.places, res.data] }));
  }

  DeletePlace(id) {
    axios.delete(`${process.env.REACT_APP_SERVER_HOST}/places/${id}`);
  }

  SeedPlaces() {
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/seed/places`, {
      count: 5
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
    .then(res => this.setState({ places: this.state.places.concat(res.data) }))
    .catch(err => console.log(err.message));
  }

  generateQrCode(id) {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/places/code/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    }).then(res => {
      const token = res.data.token.code;
      const url = `${process.env.REACT_APP_SERVER_HOST}/visit/${token}`;
      qr.toString(url).then(res => {
        this.setState({ qrUrl: res });
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
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
              onClick={() => this.SeedPlaces()}>
              Seed places
            </button>

            <div dangerouslySetInnerHTML={{ __html: this.state.qrUrl }} />
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" align="left">Id</th>
                  <th scope="col" align="right">Name</th>
                  <th scope="col" align="right">Address</th>
                  <th scope="col" align="right">LatLng</th>
                  <th scope="col" align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.places
                  .reverse().map((place, index) => {
                    const [lat, lng] = place.latlng.split(',');
                    return (
                      <tr key={place.id}>
                        <th scope="row" align="left">{place.id}</th>
                        <td align="right">{place.name}</td>
                        <td align="right">{place.address}</td>
                        <td align="right">{lat + ',' + lng}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/place/${place.id}`}
                              className="btn btn-primary">
                                View
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.DeletePlace(place.id)}>
                                Delete
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => this.generateQrCode(place.id)}>
                                Generate QR code
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