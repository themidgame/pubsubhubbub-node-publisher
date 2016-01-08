var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    Publisher = require('../lib/publisher'),
    nock = require('nock');


describe('Publisher', function(){
  var hubUrl = 'http://pubsubhubbub.appspot.com/',
  publisher = new Publisher({'hubUrl': hubUrl}),
  topicUrl = 'http://www.example.com';

  describe('constructor', function(){
    it('should validate the url is given', function(){
      assert.throws(function(){
         new Publisher();
      }, Error, 'Please specify a hub url');
    });

    it('should validate the url is valid', function(){
      assert.throws(function(){
         new Publisher({'hubUrl':'whatever'});
      }, Error, 'Please specify a valid hub url');
      assert.throws(function(){
         new Publisher({'hubUrl':'hxttp://whatever.com'});
      }, Error, 'Please specify a valid hub url');
      assert.doesNotThrow(function(){
         new Publisher({'hubUrl':'http://whatever.com'});
      });
      assert.doesNotThrow(function(){
         new Publisher({'hubUrl':'https://whatever.com'});
      });
    });
  });

  describe('when publishing', function(){

    it('should be able to publish to a hub', function(){
      assert.equal(publisher.publishUpdate(topicUrl), true, 'the publisher should be able to publish a topic.');
    });

    it('should allow the clients to see the last response', function(){
      assert.equal(publisher.lastResponse(), 'response', 'the expected last response is not available in the publisher.');
    });

  });

});
