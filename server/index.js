const express = require('express');
const app = express();
const parser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database').save


app.use(express.static(__dirname + '/../client/dist'));

app.use(parser.json());

app.post('/repos', function (req, res) {
  const valuesNeeded = ['name', 'html_url', 'stargazers_count', 'forks_count']
  let editedRepos;
  getReposByUsername(req.body.handle, (gitHubRepos) => {
    // console.log(JSON.parse(gitHubRepos));
    editedRepos = JSON.parse(gitHubRepos).map((repo) => {
      return valuesNeeded.reduce((newRepo, key) => { newRepo[key] = repo[key]; return newRepo}, {})
    })
    save(editedRepos , req.body.handle);
    // console.log(req.body.handle, )
  })
  res.end('done');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

