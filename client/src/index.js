import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './style.css';

import App from './pages/App';
import Admin from './pages/Admin';
import Login from './pages/Login';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <App />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
