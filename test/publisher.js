var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    Publisher = require('../lib/publisher'),
    nock = require('nock');


describe('Publisher', function(){
  var hubURL = 'http://pubsubhubbub.appspot.com/',
  publisher = new Publisher({'hubURL': hubURL});

  describe('constructor', function(){
    it('should validate the hub url is provided', function(){
      assert.throws(function(){
         new Publisher();
      }, Error, 'Please specify a hub url');
    });

    it('should validate the provided hub url is valid', function(){
      assert.throws(function(){
         new Publisher({'hubURL':'whatever'});
      }, Error, 'Please specify a valid hub url');
      assert.throws(function(){
         new Publisher({'hubURL':'hxttp://whatever.com'});
      }, Error, 'Please specify a valid hub url');
      assert.doesNotThrow(function(){
         new Publisher({'hubURL':'http://whatever.com'});
      });
      assert.doesNotThrow(function(){
         new Publisher({'hubURL':'https://whatever.com'});
      });
    });
  });

  describe('when publishing', function(){
    var hubURL = 'https://pubsubhubbub.appspot.com/',
    publisher = new Publisher({'hubURL': hubURL});

    it('should validate that it has a topic url', function(){
      assert.throws(function(){
        return publisher.publishUpdate();
      }, Error, 'Please specify at least one topic url.');
    });

    it('should accept one topic url', function(){
      assert.doesNotThrow(function(){
        return publisher.publishUpdate('http://www.example.com');
      });
    });
/*
    it('should accept multiple topic urls', function(){
      assert.doesNotThrow(function(){
        return publisher.publishUpdate('http://www.example.com,https://www.example.com');
      });
    });*/

    it('should validate that each topic url is valid', function(){
      assert.throws(function(){
        return publisher.publishUpdate('http://www.example.com,htp://www.example.com,https://www.example.com');
      }, Error, 'Please fix the URL: htp://www.example.com');
    });

    it('should be able to publish to a hub one topic', function(){
      return publisher.publishUpdate('http://www.example.com?myid=andres').then(function(response){
        console.log(response);
        //assert.equal(false,true);
      }).catch(function(e){
        console.log(e);
      });

    });

    it('should allow the clients to see the last response', function(){
      assert.equal(publisher.getLastResponse(), 'response', 'the expected last response is not available in the publisher.');
    });

  });

});
