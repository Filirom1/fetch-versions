var fetcher = require('..');

function ftp(id, cb){
  var options = id.split(' ');
  var regexp = new RegExp(options.splice(1).join(' '), 'g')
  var url = options[0]

  fetcher.ftpDir(url, function(err, files){
    if(err){
      return cb(err);
    }
    var versions = [];
    files.forEach(function(file){
      var match = regexp.exec(file);
      if(match){
        versions.push(match[1]);
      }
    });
    cb(null, versions);
  });
}

module.exports = ftp;
