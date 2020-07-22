import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './pages/App';
import Admin from './pages/Admin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
