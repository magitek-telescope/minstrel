import React, { Component } from 'react';
import "./Navigation.css";
import {Icon} from 'react-fa'
import {Redirect} from 'react-router-dom';

class Navigation extends Component {

  constructor(props){
    super(props);
    console.log(props);
  }

  createNewItem(){
    console.log("Execute");
    this.props.history.push("/new");
  }

  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li onClick={this.createNewItem.bind(this)}><Icon name='file-text-o' /></li>
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
