import React, { Component } from 'react';
import './Linter.css';
import { debounce } from 'lodash';
import axios from 'axios';
import stateToMarkdown from '../services/r7kamura/state-to-gfm/'; // eslint-disable-line import/no-unresolved
import NoteStore from '../stores/NoteStore';

axios.defaults.baseURL = '/api';

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
      if(res.data){
        res.data.map((error, index)=>{
          const targetTextArray = text.split("\n").slice(0, error.line);
          const targetTextString = targetTextArray.join("\n");


          if(!window.a) window.a = targetTextString;
          // console.log(targetTextString);
          console.log((targetTextString.match(new RegExp(/```[a-z]*\n[\s\S]*?\n```/g, "g")) || []).length);


          const deleteLength = (
            targetTextArray.filter(t=>t==="").length +
            targetTextString.match(new RegExp(/```[a-z]*\n[\s\S]*?\n```/, "g")).map(re=>re.split("\n").length-1).reduce((a,b)=>a+b)
          );

          error.line -= deleteLength;
        });
        this.setState({errors:res.data});
      }
    });
  }

  checkLint = debounce(this._checkLint, 500)

  render() {
    let ErrorStyles = '';

    const ErrorColors      = ["#333", "#5D3B00", "#FF0000"];
    const ErrorBackgrounds = ["transparent", "#E2C08D", "#FFF0F0"];
    this.state.errors.map((error, index) => {
      ErrorStyles += `
#root > div > div > div.Editor > div.DraftEditor-root > div > div > div > *:nth-child(${error.line}){
  color: ${ErrorColors[error.severity]};
  background: ${ErrorBackgrounds[error.severity]};
  padding: 5px 0;
}
`;
      return null;
    });

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
        <style>
          {ErrorStyles}
        </style>
      </div>
    );
  }
}

export default Linter;
