import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Shrines from './containers/Shrines'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render((
  <Router>
    <React.Fragment>
      <Route exact path='/' component={App} />
      <Route exact path='/shrines' component={Shrines} />
    </React.Fragment>
  </Router>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
