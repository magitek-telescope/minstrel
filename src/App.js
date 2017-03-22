import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Editor from './components/Editor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Editor />
      </div>
    );
  }
}

export default App;
