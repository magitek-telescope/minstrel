import './Edit.css';
import 'rodal/lib/rodal.css';

import axios from 'axios';
import React, { Component } from 'react';

import Loading from '../components/Loading';
import Note from '../components/Note';
import Explorer from '../components/Explorer';
import Navigation from '../components/Navigation';

import ShareModal from '../components/Modal/ShareModal';
import SettingsModal from '../components/Modal/SettingsModal';

import { ContentState, EditorState } from "draft-js";
import { stateFromMarkdown } from "@r7kamura/draft-js-import-markdown";
import NoteStore from '../stores/NoteStore';

axios.defaults.baseURL = 'http://localhost:4000';

class Edit extends Component {
  constructor(props){
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      isLoaded: false
    };

    axios.get(`/posts/${props.match.params.id}`)
    .then((res)=>{
      this.mergeState({
        editorState: EditorState.createWithContent(stateFromMarkdown(res.data.body)),
        isLoaded: true
      })
      NoteStore.emit('UPDATE_TEXT', this.state.editorState);
    }).catch((err)=>{console.log(err)});
  }

  mergeState(nextState){
    this.setState(
      Object.assign(
        {},
        this.state,
        nextState
      )
    )
  }

  onChange(editorState) {
    window.editorState = editorState;
    this.mergeState({
      editorState
    });
    NoteStore.emit('UPDATE_TEXT', editorState);
  }

  onClose(){
    this.mergeState({visible: false});
  }

  render() {
    return (
      <div className="Edit">
        {(() => {
          if (this.state.isLoaded) {
            return (
              <Navigation
                history={this.props.history}
              />
            );
          }
        })()}

        {(() => {
          if (this.state.isLoaded) {
            return (
              <Note
                postId={this.props.match.params.id}
                editorState={this.state.editorState}
                onEditorStateChange={this.onChange.bind(this)}
              />
            );
          }
        })()}

        {(() => {
          if (!this.state.isLoaded) {
            return (
              <Loading />
            );
          }
        })()}

        <ShareModal />
        <SettingsModal />
      </div>
    );
  }
}

export default Edit;
