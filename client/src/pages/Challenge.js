import React, { Component } from 'react';
import axios from 'axios';

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
    const { id } = challenge;

    return (
      <div>
        <h1>{`Challenge #${id}`}</h1>
        <ul>
          {places.map((place) => (
            <li key={place.id}>#{place.id}: {place.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
