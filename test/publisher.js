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
    it('should validate the hub url is provided', function(){
      assert.throws(function(){
         new Publisher();
      }, Error, 'Please specify a hub url');
    });

    it('should validate the provided hub url is valid', function(){
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

    it('should validate that it has a topic url', function(){
      assert.equal(false,true, 'The topic url should be validated');
    });

    it('should validate that the topic url is valid', function(){
      assert.equal(false,true, 'The topic url should be validated');
    });

    it('should accept one topic url', function(){
      assert.equal(false,true, 'Should accept one topic url');
    });

    it('should accept multiple topic urls', function(){
      assert.equal(false,true, 'Should accept an array of topic urls');
    });

    it('should be able to publish to a hub', function(){
      assert.equal(publisher.publishUpdate(topicUrl), true, 'the publisher should be able to publish a topic.');
    });

    it('should allow the clients to see the last response', function(){
      assert.equal(publisher.getLastResponse(), 'response', 'the expected last response is not available in the publisher.');
    });

  });

});
