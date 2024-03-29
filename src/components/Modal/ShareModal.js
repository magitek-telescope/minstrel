import './ShareModal.css';

import React, { Component } from 'react';

import Rodal from 'rodal';

import NoteStore from '../../stores/NoteStore';

class ShareModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible: false
    };

    NoteStore.on('SHOW_SHARE_MODAL', ()=>this.setState({visible: true}));
  }

  onClose(){
    this.setState({visible:false});
  }

  executeDownload(){
    window.open(`/api/posts/${this.props.postId}/download`);
  }

  render() {
    return (
      <Rodal className="ShareModal" animation='slideUp' visible={this.state.visible} onClose={this.onClose.bind(this)}>
        <div className='header'>Postを共有</div>
        <div className='body'>
          <p>
            Minstrelの共有は簡単です。<br/>
            今あなたがアクセスしているURLを、そのまま共有するだけ。特別な設定の必要なしで、あらゆる人へ共有が可能です。
          </p>
          <div>
            <input className="url" value={location.href} disabled />
          </div>
          <div className='download'>
            MarkDownとしてダウンロードしたい場合は<span className='download-link' onClick={this.executeDownload.bind(this)}>こちら</span>
          </div>
        </div>
        <button className='rodal-confirm-btn' onClick={this.onClose.bind(this)}>閉じる</button>
      </Rodal>
    );
  }
}

export default ShareModal;
