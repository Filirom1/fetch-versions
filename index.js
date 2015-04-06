var request = require('request');
var parseString = require('xml2js').parseString;

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

module.exports.getJSON = getJSON;
module.exports.getXML = getXML;
module.exports.getHTML = getHTML;
