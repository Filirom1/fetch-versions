var fetcher = require('..');

var URL = 'http://registry.npmjs.org/$ID'

function npmjs(id, cb){
  var url = URL.replace('$ID', id);
  fetcher.getJSON(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    versions = Object.keys(data.versions).reverse()
    cb(null, versions);
  });
}

module.exports = npmjs;
