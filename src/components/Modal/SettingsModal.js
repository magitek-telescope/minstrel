import './SettingsModal.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Rodal from 'rodal';

import NoteStore from '../../stores/NoteStore';

import Rules from '../../services/LintRule';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
console.log(Rules);

class SettingsModal extends Component {
  mixins: [LinkedStateMixin]

  constructor(props){
    super(props);
    let ruleActivates = [];

    console.log(Rules);
    Rules.map((rule, index)=>{
      console.log(rule);
      ruleActivates[index] = {
        name: rule,
        isActive: (localStorage.getItem(`minstrel_rules_${rule}`)=="true")
      };
    })

    this.state = {
      visible: false,
      ruleActivates
    };
    console.log(this.state);

    NoteStore.on('SHOW_SETTINGS_MODAL', ()=>this.mergeState({visible: true}));
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

  onClose(){
    this.setState({visible:false});
  }

  updateRule(index){
    const ruleActivates = this.state.ruleActivates;

    localStorage.setItem(
      `minstrel_rules_${ruleActivates[index].name}`,
      !(localStorage.getItem(`minstrel_rules_${ruleActivates[index].name}`) == "true")
    );

    ruleActivates[index].isActive = (localStorage.getItem(`minstrel_rules_${ruleActivates[index].name}`)=="true");
    this.mergeState({
      ruleActivates
    });
  }

  render() {
    return (
      <Rodal className="SettingsModal" height={400} animation='slideUp' visible={this.state.visible} onClose={this.onClose.bind(this)}>
        <div className='body'>
          <div>
            <dl>
              <dt>Lint設定</dt>

              {(() => {
                return this.state.ruleActivates.map((rule, key)=>{
                  const check = rule.isActive ? <input key={`check_${key}`} type="checkbox" checked="checked"/> : <input key={`check_${key}`} type="checkbox" />;
                  return (
                    <dd key={key}>
                      <label onClick={this.updateRule.bind(this, key)}>
                        {check} {rule.name}
                      </label>
                    </dd>
                  );
                })
              })()}
            </dl>

            <dl>
              <dt>デフォルト公開範囲</dt>
              <dd><input type="radio" checked="checked" /> Public</dd>
            </dl>
          </div>
        </div>
        <button className='rodal-confirm-btn' onClick={this.onClose.bind(this)}>閉じる</button>
      </Rodal>
    );
  }
}

export default SettingsModal;
