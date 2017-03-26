import React, { Component } from 'react';
import "./Navigation.css";
import {Icon} from 'react-fa'
import NoteStore from '../stores/NoteStore';

class Navigation extends Component {

  createNewItem(){
    console.log("Execute");
    this.props.history.push("/new");
  }

  showShareModal(){
    NoteStore.emit('SHOW_SHARE_MODAL');
  }

  moveToList(){
    this.props.history.push("/list");
  }

  showSettingsModal(){
    NoteStore.emit('SHOW_SETTINGS_MODAL');
  }

  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li onClick={this.createNewItem.bind(this)}><Icon name='file-text-o' /></li>
          <li onClick={this.moveToList.bind(this)}><Icon name='folder-open-o' /></li>
          <li onClick={this.showShareModal.bind(this)}><Icon name='share-alt' /></li>
          <li onClick={this.showSettingsModal.bind(this)}><Icon name='gear' /></li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
