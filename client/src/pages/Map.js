import React, { Component } from "react";

import Place from "../components/Place";
import axios from 'axios';
import { Link } from 'react-router-dom';



export default class Map extends Component {
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
    })
      .then(res => this.setState({places: res.data}))
      .catch(err => console.log(err));
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
              {this.state.places.reverse().map((place, index) => (
                // <div key={index} className="col mb-4">
                //   <Place id={index} />
                // </div>
                <div key={index} className="col mb-4">
                    <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{place.name}</h5>
                      <p className="card-text">{place.description}</p>
                      <Link to={'/place/' + this.props.id} className="btn btn-primary">View</Link>
                    </div>
                  </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
