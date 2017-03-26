import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import uuid from 'uuid/v4';
import Rules from './services/LintRule';

if(!localStorage.getItem("minstrel_user")) localStorage.setItem("minstrel_user", uuid());

Rules.map((rule)=>{
  if(localStorage.getItem(`minstrel_rules_${rule}`) === null) localStorage.setItem(`minstrel_rules_${rule}`, true);
  return;
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
