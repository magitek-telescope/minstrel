import React, { Component } from 'react';
import uuid from 'uuid/v4';

import New from './pages/New.js';
import List from './pages/List.js';
import Top from './pages/Top.js';
import Edit from './pages/Edit';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/"   component={Top} />
          <Route path="/new"      component={New} />
          <Route path="/list"      component={List} />
          <Route path="/edit/:id" component={Edit} />
        </div>
      </Router>
    );
  }
}

export default App;
