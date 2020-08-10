import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import PlaceCard from '../components/PlaceCard';
import ChallengeCard from "../components/ChallengeCard";

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
                const excerpt = place.description.length > 179 ?
                  place.description.substring(0, 179) + '...' :
                  place.description;
                
                return (
                  <PlaceCard
                    key={place.id}
                    id={place.id}
                    thumbnail={place.thumbnail}
                    name={place.name}
                    address={place.address}
                    excerpt={excerpt}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
