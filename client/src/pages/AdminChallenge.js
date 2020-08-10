import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import qr from 'qrcode';

export default class AdminChallange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      description: '',
      challanges: []
    }
  }
  
  ViewChallanges() {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/challenges`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
      .then(res => this.setState({ challanges: res.data }))
      .catch(err => console.log(err));
  }

  AddChallanges(e) {
    e.preventDefault();
    axios( {
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_HOST}/challenges`,
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    }).then(res => this.setState({ places: [...this.state.challanges, res.data] }));
  }

  DeleteChallange(id) {
    axios.delete(`${process.env.REACT_APP_SERVER_HOST}/challenges/${id}`);
  }

  SeedChallange() {
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/seed/challenges`, {
      count: 5
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
    .then(res => this.setState({ places: this.state.places.concat(res.data) }))
    .catch(err => console.log(err.message));
  }

  componentDidMount() {
    this.ViewChallanges();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row justify-content-between">
              <h2 className="mt-3">Challenge</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={e => this.AddChallanges(e)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Title"
                  onChange={e => this.setState({ title: e.currentTarget.value })} />
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
              onClick={() => this.SeedChallange()}>
              Seed places
            </button>

            <div dangerouslySetInnerHTML={{ __html: this.state.qrUrl }} />
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" align="left">Id</th>
                  <th scope="col" align="right">title</th>
                  <th scope="col" align="right">description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.challanges
                  .reverse().map((place, index) => {
                    return (
                      <tr key={place.id}>
                        <th scope="row" align="left">{place.challenge.id}</th>
                        <td align="right">{place.challenge.title}</td>
                        <td align="right">{place.challenge.description}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/place/${place.id}`}
                              className="btn btn-primary">
                                View
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.DeleteChallange(place.id)}>
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