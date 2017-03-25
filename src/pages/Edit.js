import './Edit.css';
import axios from 'axios';
import React, { Component } from 'react';
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
      editorState: EditorState.createEmpty()
    };

    axios.get(`/posts/${props.match.params.id}`)
    .then((res)=>{
      console.log(res);
      this.setState({
        editorState: EditorState.createWithContent(stateFromMarkdown(res.data.body))
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  onChange(editorState) {
    window.editorState = editorState;

    this.setState({ editorState });
    NoteStore.emit('UPDATE_TEXT', editorState);
  }

  render() {
    return (
      <div className="Edit">
        <Navigation />
        <Note
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default Edit;
