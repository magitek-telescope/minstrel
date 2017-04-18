import './Explorer.css';
import React, { Component } from 'react';
import uuid from 'uuid/v4';
import {Icon} from 'react-fa';

class Explorer extends Component {
  constructor(props){
    super(props);
  }

  moveToPost(id){
    location.href = `/edit/${id}`;
  }

  render() {
    return (
      <div className={"Explorer" + (this.props.isOpenList ? " is-open" : "")}>
        <ul>
          <li className="close" onClick={this.props.onClickCloseButton}>
            &times;
          </li>
          {(()=>{
            return this.props.posts.map((post, index)=>{
              return (
                <li key={index} onClick={this.moveToPost.bind(this, post.id)}>
                  <div className="NoteName"><Icon name='file-text-o' /> <span className="NoteNameBody">{post.title.replace("# ", "")||"無題"}</span></div>
                </li>
              );
            });
          })()}
        </ul>
      </div>
    );
  }
}

export default Explorer;
