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

import { EditorState } from "draft-js";
import { stateFromMarkdown } from "@r7kamura/draft-js-import-markdown";
import NoteStore from '../stores/NoteStore';

axios.defaults.baseURL = process.env.API_ROOT;

class Edit extends Component {
  constructor(props){
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      posts: [],
      isLoaded: false,
      isOpenList: false
    };

    NoteStore.off();

    let editorState;

    axios.get(`/posts/${props.match.params.id}`)
    .then((res)=>{
      editorState = EditorState.createWithContent(stateFromMarkdown(res.data.body||""));
      return axios.get(`/users/${localStorage.getItem("minstrel_user")}`);
    })
    .then((res)=>{
      const posts = (res.data.posts||[]).map((post)=>{
        const rawData =  post.body.split("\n");
        const title = rawData[0];
        rawData.shift();
        const body = rawData.join("\n");

        return {
          id: post.id,
          title,
          body
        }
      });

      this.mergeState({
        editorState,
        isLoaded: true,
        posts
      });
      console.log(this.state);
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

  openExploler(){
    this.mergeState({
      isOpenList: true
    })
  }

  closeExplorer(){
    this.mergeState({
      isOpenList: false
    })
  }

  render() {
    return (
      <div className="Edit">

        {(() => {
          if (this.state.isLoaded) {
            return (
              <Navigation
                postId={this.props.match.params.id}
                history={this.props.history}
                onClickOpenList={this.openExploler.bind(this)}
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
          if (this.state.isLoaded) {
            return (
              <Explorer
                posts={this.state.posts}
                history={this.props.history}
                isOpenList={this.state.isOpenList}
                onClickCloseButton={this.closeExplorer.bind(this)}
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

        <ShareModal
          postId={this.props.match.params.id}
        />
        <SettingsModal />
      </div>
    );
  }
}

export default Edit;
