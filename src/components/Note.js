import 'draft-js-emoji-plugin/lib/plugin.css';

import { Entity } from 'draft-js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from 'draft-js-plugins-editor';

import createEmojiPlugin from 'draft-js-emoji-plugin'; // eslint-disable-line import/no-unresolved
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createAutoListPlugin from 'draft-js-autolist-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createMarklessPlugin from '../services/r7kamura/draft-js-markless-plugin/';

import './Note.css';
import Linter from './Linter';

const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const counterPlugin = createCounterPlugin();
const autoListPlugin = createAutoListPlugin();
const marklessPlugin = createMarklessPlugin();
const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();

const { EmojiSuggestions } = emojiPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;

import {stateToMarkdown} from 'draft-js-export-markdown';

import { debounce } from 'lodash';
import axios from 'axios';

import NoteStore from '../stores/NoteStore';

const plugins = [
  emojiPlugin,
  // autoListPlugin,
  linkifyPlugin,
  markdownShortcutsPlugin,
  // marklessPlugin,
  counterPlugin
];

class Note extends Component {
  constructor(props) {
    super(props);

    NoteStore.on('UPDATE_TEXT', (editorState)=>{
      this.autoSave(stateToMarkdown(editorState.getCurrentContent()));
    });
  }

  _autoSave(text){
    axios.put(
      `/posts/${this.props.postId}`,
      {
        body: text
      }
    ).then(()=>{}).catch(()=>{});
  }

  autoSave = debounce(this._autoSave, 500)

  render() {
    return (
      <div className='Editor'>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.onEditorStateChange}
          plugins={plugins}
        />
        <div className='Counts'>
          <div><LineCounter editorState={this.props.editorState} /> lines</div>
          <div><CharCounter editorState={this.props.editorState} /> chars</div>
        </div>
        <Linter editorState={this.props.editorState} />
      </div>
    );
  }
}

export default Note;
