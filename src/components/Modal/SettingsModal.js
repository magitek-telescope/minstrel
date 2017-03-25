import './SettingsModal.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Rodal from 'rodal';

import NoteStore from '../../stores/NoteStore';

class SettingsModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible: false
    };

    NoteStore.on('SHOW_SETTINGS_MODAL', ()=>this.setState({visible: true}));
  }

  onClose(){
    this.setState({visible:false});
  }

  render() {
    return (
      <Rodal className="SettingsModal" height={400} animation='slideUp' visible={this.state.visible} onClose={this.onClose.bind(this)}>
        <div className='body'>
          <div>
            <dl>
              <dt>Lint設定</dt>
              <dd><input type="checkbox" /> textlint-rule-no-todo</dd>
              <dd><input type="checkbox" /> textlint-rule-web-plus-db</dd>
              <dd><input type="checkbox" /> textlint-rule-no-mix-dearu-desumasu</dd>
            </dl>

            <dl>
              <dt>デフォルト公開範囲</dt>
              <dd><input type="radio" /> Public</dd>
              <dd><input type="radio" /> Private</dd>
            </dl>
          </div>
        </div>
        <button className='rodal-confirm-btn' onClick={this.onClose.bind(this)}>閉じる</button>
      </Rodal>
    );
  }
}

export default SettingsModal;
