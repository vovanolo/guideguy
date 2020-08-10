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
      // challenges: [{ id: 3, title: 'Challenge #3', description: 'Some test description for challenge #3' }]
      challenges: []
    };
  }

  ViewChallanges(){
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/challenges`, {
    })
      .then(res => this.setState({ challenges: res.data }))
      .catch(err => console.log(err));
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
              {this.state.challenges.reverse().map(({challenge}, index) => {
                const excerpt = challenge.description.length > 179 ?
                  challenge.description.substring(0, 179) + '...' :
                  challenge.description;
                
                return (
                  <ChallengeCard
                    key={index}
                    id={challenge.id}
                    title={challenge.title}
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
