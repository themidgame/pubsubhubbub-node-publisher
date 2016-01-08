var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    Publisher = require('../lib/publisher'),
    nock = require('nock');


describe('Publisher', function(){
  var hubUrl = 'http://pubsubhubbub.appspot.com/',
  publisher = new Publisher(hubUrl),
  topicUrl = 'http://www.example.com';

  it('should be able to publish to a hub', function(){
    assert.equal(publisher.publishUpdate(topicUrl), true, 'the publisher should be able to publish a topic.');
  });

  it('should allow the clients to see the last response', function(){
    assert.equal(publisher.lastResponse(), 'response', 'the expected last response is not available in the publisher.');
  });

});
