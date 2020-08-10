import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './style.css';

import App from './pages/App';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Map from './pages/Map';
import Place from './pages/Place';
import Visit from './pages/Visit';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import AdminChallange from './pages/AdminChallenge';
import Navbar from './components/Navbar';

const child = React.createRef();

function updateJwtToken() {
  child.current.updateJwtToken();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar ref={child} />
      <Route exact path='/' component={App} />
      <Route path='/admin' component={Admin} />
      <Route path='/admin/challanges' component={AdminChallange}></Route>
      <Route path='/profile' component={Profile} />
      <Route path='/login' component={() => <Login updateJwtToken={updateJwtToken} />} />
      <Route path='/signup' component={() => <SignUp updateJwtToken={updateJwtToken} />} />
      <Route path='/map' component={Map} />
      <Route path='/place/:id' component={Place} />
      <Route path='/visit/:visitToken' component={Visit} />
      <Route path='/challenges' component={Challenges} />
      <Route path='/challenge/:id' component={Challenge} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
