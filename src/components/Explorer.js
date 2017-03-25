import './Explorer.css';
import React, { Component } from 'react';

class Explorer extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [
        "Minstrelテスト",
        "インターステラーをみた",
        "「ハーモニー」を読んだ",
        "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 ",
      ]
    }
  }
  render() {
    return (
      <div className="Explorer">
        <ul>
          {(()=>{
            return this.state.notes.map((note, index)=>{
              return (
                <li key={index}>
                  <div className="NoteName">{note}</div>
                  <div className="uuid">uuid</div>
                </li>
              );
            });
          })()}
        </ul>
      </div>
    );
  }
}

export default Explorer;
