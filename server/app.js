const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const TextLintCore = require('textlint').TextLintCore;
const client = require("redis").createClient({
  port: 16379
});

const app = express();

app.use(bodyParser());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
  next();
});

app.post("/api/lint", (req, res) => {
  const rules = [];

  req.body.rules.map((rule) => {
    rules[rule] = require(rule);
  });

  const textlint = new TextLintCore();
  textlint.setupRules(rules);
  const raw = req.body.body//.replace(/```[a-z]*\n[\s\S]*?\n```/g, "<!-- code -->");
  // console.log(raw);
  textlint.lintMarkdown(raw).then(result => {
    // console.log(result);
    res.json(result.messages);
  });
});

app.get("/api/users/:id", (req, res) => {
  client.get(`/users/${req.params.id}`, (err, rawPosts)=>{
    const posts = JSON.parse(rawPosts||'{"posts":[]}');
    Promise.all(posts.posts.map((post)=>{
      return new Promise((resolve, reject)=>{
        // console.log(post);
        client.get(`/posts/${post}`, (err, body)=>{
          if(err){
            reject();
            return
          }
          resolve({
            id: post,
            body
          });
          return;
        })
      });
    }))
    .then((userPosts)=>{
      res.json({
        posts: userPosts
      })
    });
  })
});

app.get("/api/posts/:id/download", (req, res) => {
  client.get(`/posts/${req.params.id}`, (err, body)=>{
    res.header("Content-Type"       , "application/octet-stream");
    res.header("Content-Disposition", `attachment; filename="${req.params.id}.md"`);
    res.send(body);
  })
});

app.get("/api/posts/:id", (req, res) => {
  client.get(`/posts/${req.params.id}`, (err, body)=>{
    res.json({
      body
    })
  })
});

app.post("/api/posts", (req, res) => {
  client.exists(`/posts/${req.body.id}`, req.body.body, (err, isExistPost)=>{
    if(isExistPost){
      res.json({
        result: 'duplicate'
      });
    }

    client.set(`/posts/${req.body.id}`, req.body.body, (err)=>{
      // console.log(req.body.user_id);
      client.get(`/users/${req.body.user_id}`, (err, user_posts)=>{
        // console.log(user_posts);
        const posts = JSON.parse(user_posts||'{"posts":[]}');
        posts.posts.push(req.body.id);

        client.set(`/users/${req.body.user_id}`, JSON.stringify(posts), (err)=>{
          res.json({
            result: 'success'
          });
        });
      });
    });
  });
})

app.put("/api/posts/:id", (req, res) => {
  client.set(`/posts/${req.params.id}`, req.body.body, (err, body)=>{
    res.json({
      result: 'success'
    });
  })
});

app.use(express.static(__dirname + '/../public'))
app.use(fallback(__dirname + '.index.html', { root: __dirname + '/../public' }))

app.listen(process.env.PORT || 4001);
