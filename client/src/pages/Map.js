import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    }
  }

  ViewPlaces() {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/places`, {
    })
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.ViewPlaces();
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h1>Places</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-cols-md-3 row-cols-1">
              {this.state.places.reverse().map((place, index) => {
                const excerpt = place.description.substring(0, 179) + '...';
                return (
                  <div key={index} className="col mb-4">
                    <div className="card">
                    <img
                      className="card-img-top"
                      src={place.thumbnail}
                      alt={place.name}
                    />
                      <div className="card-body">
                        <h5 className="card-title">{place.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{place.address}</h6>
                        <p className="card-text">{excerpt}</p>
                        <Link to={'/place/' + place.id} className="btn btn-primary">View</Link>
                      </div>
                    </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
