import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './style.css';

import App from './pages/App';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Map from './pages/Map';
import Visit from './pages/Visit';

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
      <Route path='/login' component={Login} />
      <Route path='/signup' component={() => <SignUp updateJwtToken={updateJwtToken} />} />
      <Route path='/map' component={Map} />
      <Route path='/visit/:visitToken' component={Visit} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
