import './List.css';

import axios from 'axios';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Loading from '../components/Loading';

axios.defaults.baseURL = 'http://localhost:4000';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      isLoaded: false
    }

    axios.get(`/users/${localStorage.getItem("minstrel_user")}`)
    .then((res)=>{
      this.setState({
        posts: res.data.posts.map((post)=>{
          const rawData =  post.body.split("\n");
          const title = rawData[0];
          rawData.shift();
          const body = rawData.join("\n");

          return {
            id: post.id,
            title,
            body
          }
        }),
        isLoaded: true
      });
    }).catch((err)=>{console.log(err)});
  }

  render() {
    return (
      <div className="List">

        {(() => {
          if (this.state.isLoaded) {
            return (<h1>Your Posts</h1>);
          }
        })()}
          {(() => {
            if (this.state.isLoaded) {
              return (
                <div className="container">
                  <button>
                    <Link to="/new">
                      新規作成
                    </Link>
                  </button>
                </div>
              );
            }
          })()}

        {(() => {
          if (this.state.isLoaded) {
            return (
              <ul>
                {(()=>{
                  return this.state.posts.map((post, index)=>{
                    console.log(this.state.posts);
                    if(!post.body){
                      return;
                    }
                    return (
                      <li key={index}>
                        <div className="title">
                          {post.title.replace(/# /g, "")}
                        </div>
                        <div className="body">
                          {post.body.length >= 300 ? post.body.slice(0, 140)+"……" : post.body}
                          </div>
                        <div className="link">
                          <Link to={"/edit/"+post.id}>
                            Edit this post.
                          </Link>
                        </div>
                      </li>
                    );
                  });
                })()}
              </ul>
            );
          }
        })()}

        {(() => {
          if (!this.state.isLoaded) {
            return (
              <Loading />
            );
          }
        })()}
      </div>
    );
  }
}

export default List;
