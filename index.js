var URL = require('url');
var request = require('request');
var parseString = require('xml2js').parseString;
var Ftp = require('ftp');

request = request.defaults({
  headers: {
    'User-Agent': 'Filirom1/fetch-versions'
  }
})

var getJSON = function(url, cb){
  return request.get({url: url, json: true}, cb);
}

var getXML = function(url, cb){
  return request.get({url: url}, function(err, resp, data){
    if(err){
      return cb(err);
    }
    parseString(data, function(err, xml){
      cb(err, resp, xml)
    });
  });
}

var getHTML = function(url, cb){
  return request.get({url: url}, cb);
}

var ftpDir = function(url, cb){
  var urlObj = URL.parse(url);
  var ftp = new Ftp();
  ftp.connect(urlObj);
  ftp.on('error', function(err){
    return cb(err);
  });

  ftp.on('ready', function(){
    ftp.list(urlObj.path, function(err, list){
      if(err){
        return cb(err);
      }

      // list only files
      list = list.filter(function(a){
        return a.type === '-';
      });
      // sort by date
      list = list.sort(function(a, b){
        return b.date - a.date;
      });

      var files = list.map(function(a){
        return a.name;
      });

      cb(null, files);
    });
  });
}

module.exports.getJSON = getJSON;
module.exports.getXML = getXML;
module.exports.getHTML = getHTML;
module.exports.ftpDir = ftpDir;
