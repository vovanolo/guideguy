import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHost: 'http://localhost:3050'
    }
  }

  componentDidMount() {
    const { serverHost } = this.state;
    axios.post(serverHost, {username: 'test1'}).then(res => console.log(res.data));
  }

  render() {
    return (
      <header>
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <Link to="/" className="navbar-brand">GuideGuy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><img src="ellipsis-v-solid.svg" width='30' height='30' alt="" /></span>
        </button>

        <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Map</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button className="btn  my-2 my-sm-0" type="login">Log in</button>
            <button className="btn  my-2 my-sm-0 ml-3" type="Sign">Sign up</button>
          </form>
        </div>
      </nav>
    </div>


    <div className="video-container">
      {/* <video src="back.mp4" autoplay muted loop></video> */}
    </div>

    <div className="container content-center" style={{zIndex: 2, position: 'absolute'}}>
      <h1 style={{color: 'white'}}>
        Dream Big <br />
        Explore Over
      </h1>
    </div>
    <div className="box-2">
      <div className="btn-main btn-two">
        <span>Explore</span>
      </div>
    </div>

  </header>
    );
  }
}

export default App;
