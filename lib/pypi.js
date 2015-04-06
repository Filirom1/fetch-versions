var fetcher = require('..');

var URL = 'https://pypi.python.org/pypi/$ID/json'

function rubygems(id, cb){
  var url = URL.replace('$ID', id);
  fetcher.getJSON(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    versions = Object.keys(data.releases).reverse()
    cb(null, versions);
  });
}

module.exports = rubygems;
