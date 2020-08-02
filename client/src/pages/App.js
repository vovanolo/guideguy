import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050'
    }
  }

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

export default App;
