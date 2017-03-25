const express = require('express');
const bodyParser = require('body-parser');
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

app.post("/lint", (req, res) => {
  const rules = [];

  req.body.rules.map((rule) => {
    rules[rule] = require(rule);
  });

  const textlint = new TextLintCore();
  textlint.setupRules(rules);

  textlint.lintMarkdown(req.body.body).then(result => {
    res.json(result.messages);
  });
});

app.get("/posts/:id", (req, res) => {
  client.get(`/posts/${req.params.id}`, (err, body)=>{
    res.json({
      body
    })
  })
});

app.post("/posts", (req, res) => {
  client.set(`/posts/${req.body.id}`, req.body.body, (err, body)=>{
    res.json({
      result: 'success'
    });
  })
});

app.put("/posts/id", (req, res) => {
  client.set(`/posts/${req.body.id}`, req.body.body, (err, body)=>{
    res.json({
      result: 'success'
    });
  })
});

app.listen(process.env.PORT || 4000);