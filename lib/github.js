var fetcher = require('..');

var URL = 'https://api.github.com/repos/$ID/git/refs/tags'

function github(id, cb){
  var url = URL.replace('$ID', id);
  fetcher.getJSON(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    versions = data.map(function(ref){
      return ref.ref.replace('refs/tags/', '').replace(/^v/, '');
    });
    cb(null, versions.reverse());
  });
}

module.exports = github;
