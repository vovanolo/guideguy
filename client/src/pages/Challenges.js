import React, { Component } from 'react';
import axios from 'axios';
import ChallengeCard from '../components/ChallengeCard';

export default class Challenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      description: '',
      challenges: []
    };
  }

  ViewChallanges(){
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/challenges`, {
      headers: {
        'Authorization': `Bearer ${localStorage.JWT_TOKEN}`
      }
    })
      .then(res => this.setState({ challenges: res.data }))
      .catch(err => console.dir(err));
  }

  componentDidMount(){
    this.ViewChallanges();
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h1>Challenges</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-cols-md-3 row-cols-1">
              {this.state.challenges.reverse().map((challengeInfo) => {
                const { challenge } = challengeInfo;
                const excerpt = challenge.description.length > 179 ?
                  challenge.description.substring(0, 179) + '...' :
                  challenge.description;
                
                return (
                  <ChallengeCard
                    key={challenge.id}
                    id={challenge.id}
                    title={challenge.title}
                    excerpt={excerpt}
                    completed={challengeInfo.completed}
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
