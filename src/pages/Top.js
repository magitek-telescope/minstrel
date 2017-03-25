import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';

class Top extends Component {
  render() {
    return (
      <div>
        <Link to={"edit/"+uuid()}>新規作成</Link>
      </div>
    );
  }
}

export default Top;
