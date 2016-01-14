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
        return publisher.publishUpdate('https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCjyq_K1Xwfg8Lndy7lKMpA');
      });
    });

    it('should accept multiple topic urls', function(){
      nock('https://pubsubhubbub.appspot.com')
          .post('/',{
            'hub.mode': 'publish',
            'hub.url[0]': 'http://www.example.com',
            'hub.url[1]': 'https://www.example.com',
          })
          .reply(204,{});
      assert.doesNotThrow(function(){
        return publisher.publishUpdate('http://www.example.com,https://www.example.com').then(function(response){
          assert.equal(response.statusCode,204);
        });
      });
    });

    it('should validate that each topic url is valid', function(){
      assert.throws(function(){
        return publisher.publishUpdate('https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCjyq_K1Xwfg8Lndy7lKMpA,htp://www.example.com,http://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCjyq_K1Xwfg8Lndy7lKMpA');
      }, Error, 'Please fix the URL: htp://www.example.com');
    });

    it('should be able to publish one topic to a hub', function(){
      nock('https://pubsubhubbub.appspot.com')
          .post('/',{
            'hub.mode': 'publish',
            'hub.url': 'https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCjyq_K1Xwfg8Lndy7lKMpA'
          })
          .reply(204,{});
      return publisher.publishUpdate('https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCjyq_K1Xwfg8Lndy7lKMpA').then(function(response){
        assert.equal(response.statusCode, 204, 'the server should have replied with 204');
      }).catch(function(e){
        console.log(e);
      });

    });

    it('should allow the clients to see the last response', function(){
      assert.equal(publisher.getLastResponse().statusCode, 204, 'the expected last response is not available in the publisher.');
    });

  });

});
