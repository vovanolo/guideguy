import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Place extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Hotel "Lviv"</h5>
          <p className="card-text">This is the most famous hotel in Lviv, and it is located in the center of this city.</p>
          <Link to={'/place/' + this.props.id} className="btn btn-primary">View</Link>
        </div>
      </div>
    );
  }
}
