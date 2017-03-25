import './Edit.css';
import axios from 'axios';
import React, { Component } from 'react';

import Loading from '../components/Loading';
import Note from '../components/Note';
import Navigation from '../components/Navigation';

import { ContentState, EditorState } from "draft-js";
import { stateFromMarkdown } from "@r7kamura/draft-js-import-markdown";
import NoteStore from '../stores/NoteStore';

axios.defaults.baseURL = 'http://localhost:4000';

class Edit extends Component {
  constructor(props){
    super(props);
    console.dir(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      isLoaded: false
    };

    axios.get(`/posts/${props.match.params.id}`)
    .then((res)=>{
      console.log(res);
      this.setState({
        editorState: EditorState.createWithContent(stateFromMarkdown(res.data.body)),
        isLoaded: true
      });
      NoteStore.emit('UPDATE_TEXT', this.state.editorState);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  onChange(editorState) {
    window.editorState = editorState;

    this.setState({
      editorState,
      isLoaded: true
    });
    NoteStore.emit('UPDATE_TEXT', editorState);
  }

  render() {
    return (
      <div className="Edit">
        {(() => {
          if (this.state.isLoaded) {
            return (
              <Navigation />
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
      </div>
    );
  }
}

export default Edit;
