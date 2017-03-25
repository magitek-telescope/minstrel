import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import uuid from 'uuid/v4';

if(!localStorage.getItem("minstrel_user")) localStorage.setItem("minstrel_user", uuid());

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
