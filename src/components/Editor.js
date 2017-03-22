require("simplemde/dist/simplemde.min.css")

// import {textLintCore} from 'textlint';
import React, { Component } from 'react';
import './Editor.css';
import SimpleMDE from 'react-simplemde-editor';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: ''
    };
  }

  checkLint(){
    // console.log("test");
  }

  render() {
    const options = {
      code: '',
      readOnly: false,
      mode: 'markdown',
      toolbar: false,
      placeholder: '# Type here...'
    };
    console.log(options);

    return (
      <div className='Editor'>
        <SimpleMDE
          value={this.state.body}
          onChange={this.checkLint}
          ref="editor"
          options={options}
        />
      </div>
    );
  }
}

export default Editor;
