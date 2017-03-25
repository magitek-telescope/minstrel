import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

class Top extends Component {

  constructor(props){
    super(props);

    const id = uuid();
    axios.post(
      `/posts/`,
      {
        id,
        body: ''
      }
    )
    .then(()=>{
      setTimeout(()=>{
        this.props.history.push(`/edit/${id}`);
      }, 1000);
    })
    .catch(()=>{

    });
  }

  render() {
    return (
      <Loading />
    );
  }
}

export default Top;
