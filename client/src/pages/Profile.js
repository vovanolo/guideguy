import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      username: '',
      role: '',
      places: [],
      challenges: []
    };
  }

  getUserInfo() {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/users/${localStorage.userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
      .then((res) => {
        const userInfo = res.data;
        delete userInfo.password;
        this.setState({ ...userInfo });
        axios(`${process.env.REACT_APP_SERVER_HOST}/visit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
          },
          data: {
            userId: localStorage.userId
          }
        })
          .then((res) => {
            this.setState({ places: res.data })
            this.state.places.forEach(({ id }) => {
              axios(`${process.env.REACT_APP_SERVER_HOST}/challenges`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
                },
                data: {
                  placeId: id
                }
              })
                .then((res) => this.setState({ challenges: res.data }))
                .catch((error) => console.dir(error));
            })
          })
          .catch((error) => console.dir(error));
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col">
            <h1>Visited places</h1>
            <ul>
              {this.state.places.map((place) => (
                <li key={place.id}>{place.name}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 col">
            <h1>Joined challenges</h1>
            <ul>
              {this.state.challenges.map(({ challenge }) => (
                <li key={challenge.id}>{challenge.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}