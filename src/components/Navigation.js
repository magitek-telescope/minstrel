import React, { Component } from 'react';
import "./Navigation.css";
import {Icon} from 'react-fa'

class Navigation extends Component {
  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li><Icon name='file-text-o' /></li>
          <li><Icon name='folder-open-o' /></li>
          <li><Icon name='code' /></li>
          <li><Icon name='share-alt' /></li>
          <li><Icon name='gear' /></li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
