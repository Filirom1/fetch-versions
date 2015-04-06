var fetcher = require('..');

var URL = 'http://rubygems.org/api/v1/versions/$ID.json'

function rubygems(id, cb){
  var url = URL.replace('$ID', id);
  fetcher.getJSON(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    versions = data.map(function(version){
      return version.number
    });
    cb(null, versions);
  });
}

module.exports = rubygems;
