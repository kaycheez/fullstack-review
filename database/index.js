const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/repos');

let repoSchema = mongoose.Schema({
  repo_name: String,
  owner: String,
  html_url: String,
  forks_count: Number,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, owner) => {
  Repo.find({ owner: owner }, function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  })
  // repos.forEach(repo => {
  //   let { repo_name, html_url, forks_count, stargazers_count} = repo
  //   let obj = new Repo({
  //     owner,
  //     repo_name,
  //     html_url,
  //     forks_count,
  //     stargazers_count
  //   });
  //   console.log(dbRepo.schema.paths);
    // obj.save(function(err) {
    //   if (err) {
    //     console.log('error')
    //   }
    // })
  // });
}

module.exports.save = save;