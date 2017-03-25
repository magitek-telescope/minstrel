import React, { Component } from 'react';
import "./Navigation.css";
import {Icon} from 'react-fa'
import {Redirect} from 'react-router-dom';

import NoteStore from '../stores/NoteStore';

class Navigation extends Component {

  constructor(props){
    super(props);
    console.log(props);
  }

  createNewItem(){
    console.log("Execute");
    this.props.history.push("/new");
  }

  showShareModal(){
    NoteStore.emit('SHOW_SHARE_MODAL');
  }

  showSettingsModal(){
    NoteStore.emit('SHOW_SETTINGS_MODAL');
  }

  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li onClick={this.createNewItem.bind(this)}><Icon name='file-text-o' /></li>
          <li><Icon name='folder-open-o' /></li>
          <li onClick={this.showShareModal.bind(this)}><Icon name='share-alt' /></li>
          <li onClick={this.showSettingsModal.bind(this)}><Icon name='gear' /></li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
