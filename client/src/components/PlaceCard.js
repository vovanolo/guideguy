import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class PlaceCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  
  render() {
    const { id, name, excerpt, address, thumbnail } = this.props;

    return (
      <div className="col mb-4">
        <div className="card">
          <img
            className="card-img-top"
            src={thumbnail}
            alt={name}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
            <p className="card-text">{excerpt}</p>
            <Link to={'/place/' + id} className="btn btn-primary">View</Link>
          </div>
        </div>
      </div>
    );
  }
}
