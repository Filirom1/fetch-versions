var fetcher = require('..');

var URL = 'http://pear.php.net/rest/r/$ID/allreleases.xml'

function pearphp(id, cb){
  var url = URL.replace('$ID', id);
  fetcher.getXML(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    versions = data.a.r.map(function(release){
      return release.v[0]
    });
    cb(null, versions);
  });
}

module.exports = pearphp;
