import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {
        id: 0,
        title: '',
        description: '',
      },
      places: []
    };
  }

  componentDidMount() {
    this.viewChallenge();
  }

  viewChallenge() {
    const { id } = this.props.match.params;
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/challenges/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
      .then((res) => this.setState({ ...res.data }))
      .catch((error) => console.dir(error));
  }

  render() {
    const { challenge, places } = this.state;
    const { id, title } = challenge;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{`Challenge ${title}`}</h1>
            <h5>Places in this challenge:</h5>
            <div className="list-group">
              {places.map((place) => (
                <Link
                  to={`/place/${place.id}`}
                  key={place.id}
                  className="list-group-item list-group-item-action"
                >
                  {`$${place.id}: ${place.name}`}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
