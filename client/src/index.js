import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './style.css';

import App from './pages/App';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Visit from './pages/Visit';
import Place from './pages/Place';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path='/' component={App} />
      <Route path='/admin' component={Admin} />
      <Route path='/login' component={Login} />
      <Route path='/visit/:visitToken' component={Visit} />
      <Route path='/place' component={Place} />
      {/* <Switch>
        <Route exact path='/'>
          <App />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/visit/:visitToken' component={Visit} />
      </Switch> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
