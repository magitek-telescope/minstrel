import React, { Component } from 'react';
import './Linter.css';
import { debounce } from 'lodash';
import axios from 'axios';
import stateToMarkdown from '../services/r7kamura/state-to-gfm/';
import NoteStore from '../stores/NoteStore';

axios.defaults.baseURL = 'http://localhost:4000';

const ERRORS = [
  'pass',
  'warning',
  'error'
]

class Linter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    NoteStore.on('UPDATE_TEXT', (editorState)=>{
      this.checkLint(stateToMarkdown(editorState.getCurrentContent()));
    });
  }

  _checkLint(text){
    axios.post(
      "/lint",
      {
        body: text||"",
        rules: [
          "textlint-rule-no-todo",
          "textlint-rule-no-mix-dearu-desumasu",
          "textlint-rule-web-plus-db",
          "textlint-rule-ja-no-redundant-expression",
          "textlint-rule-ja-no-weak-phrase",
          "textlint-rule-no-dropping-the-ra"
        ]
      }
    ).then((res)=>{
      if(res.data) this.setState({errors:res.data});
    });
  }

  checkLint = debounce(this._checkLint, 500)

  render() {
    return (
      <div className='Linter'>
        <ul>
          {
            this.state.errors.map((error, index) => {
              return (
                <li key={index} className={ERRORS[error.severity]}>
                  <div className="error-line">L{error.line}, C{error.column}</div>
                  <div>|</div>
                  <div className="error-body">{error.message}</div>
                  <div>|</div>
                  <div className="error-type">{error.ruleId}</div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default Linter;
