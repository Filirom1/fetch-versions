var expect = require('chai').expect;
var fetcher = require('../lib/pearphp');
var vercomp = require('smart-vercomp');

function test(lib, id){
  describe(lib, function(){
    it('should return the list of versions', function(done){
      require('../lib/' + lib)(id, function(err, versions){
        expect(err).to.be.null
        console.log(versions)
        expect(versions.length).to.be.gte(2)
        expect(versions[0]).to.be.a('string')
        expect(versions[0]).to.match(/\d+\.\d+\.\d+/)
        expect(vercomp(versions[0], versions[1])).to.be.eq(1)
        done()
      });
    });
  });
}

test('pearphp', 'net_url');
test('rubygems', 'rails');
test('npmjs', 'request');
test('github', 'Filirom1/findup');
test('pypi', 'arrow');
test('folder', 'http://curl.haxx.se/download/ curl-([0-9\.]*)\.tar\.gz');
