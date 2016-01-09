
var validator = require('validator'),
    url = require('url'),
    request = require('request-promise'),
    querystring = require('querystring'),
    _ = require('underscore');





function Publisher(opts){
  var self = this;
  this._options = opts || {};

  if(!this._options.hubURL){
    throw new Error('Please specify a hub url');
  }
  else{
    var isURL = validator.isURL(self._options.hubURL,{protocols: ['http','https'], require_protocol:true});
    if(!isURL) throw new Error('Please specify a valid hub url');
  }

  /**
     * Notify the hub of new content on the topic url
     * @param topicURL string A URL or multiple urls separated by comma
   */
  this.publishUpdate = function(topicURL){
    var postString = 'hub.mode=publish';
    if(!topicURL){
      throw new Error('Please specify at least one topic url.');
    }
    topicURLs = topicURL.split(',');
    _.each(topicURLs, function(url){
      var isURL = validator.isURL(url,{protocols: ['http','https'], require_protocol:true});
      if(!isURL) throw new Error('Please fix the URL: ' + url );
      postString += '&hub.url=' + encodeURIComponent(url);
    });
    console.log('the string',querystring.parse(postString));
    return request.post(
      self._options.hubURL,
      {
        form: querystring.parse(postString),
      }
    ).then(function(whatever){
      console.log('whatever',whatever);
    }).catch(function(e){
      console.log(e);
    });

  };

  this.getLastResponse = function(){
    return self._lastResponse;
  };

}

module.exports = Publisher;
