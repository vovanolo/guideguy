import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class ChallengeCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  
  render() {
    const { title, excerpt } = this.props;

    return (
      <div className="col mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{excerpt}</p>
            <Link to={'/challenge/' + this.props.id} className="btn btn-primary">View</Link>
          </div>
        </div>
      </div>
    );
  }
}
