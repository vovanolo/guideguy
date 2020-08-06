import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <div className="video-container">
          <video src="back.mp4" autoplay muted loop></video>
        </div> */}

        <div className="mt-5">
          <h1 className="mb-3">
            Dream Big <br />
            Explore Over
          </h1>
          <Link to="/map" className="btn btn-primary">
            Explore
          </Link>
        </div>
      </div>
    );
  }
}
