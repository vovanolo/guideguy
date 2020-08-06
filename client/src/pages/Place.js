import React from 'react';
import axios from 'axios';

export default class Place extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      thumbnail: '',
      description: ''
    };
  }

  ViewPlace() {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/places/${this.props.match.params.id}`)
      .then(res => 
        this.setState({
          name: res.data.name,
          thumbnail: res.data.thumbnail,
          description: res.data.description
        }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.ViewPlace();
  }

  render() {
    return (
      <section className="place">
        <div className="container place__container">
          <div className="row mt-5">

            <div className="col-12 text-center mt-5">
              <h1 className="place__header">{this.state.name}</h1>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center mt-2">
              <div className="place__picture">
                <img src={this.state.thumbnail} alt={this.state.name}></img>
              </div>
            </div>

            <div className="col-12 text-center mt-3">
              <p className="place__description">{this.state.description}</p>
            </div>

          </div>
        </div>

      </section>
    )
  }
}