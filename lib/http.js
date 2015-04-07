var fetcher = require('..');

function http(id, cb){
  var options = id.split(' ');
  var regexp = new RegExp(options.splice(1).join(' '), 'g')
  var url = options[0]

  fetcher.getHTML(url, function(err, resp, data){
    if(err){
      return cb(err);
    }
    var versions = [];
    while ((arr = regexp.exec(data)) !== null){
      var version = arr[1];
      if(versions.indexOf(version) === -1){
        versions.push(version)
      }
    };
    cb(null, versions.reverse());
  });
}

module.exports = http;
