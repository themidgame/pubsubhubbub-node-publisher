
function Publisher(opts){
  var self = this;
  this._options = opts || {};

  if(!this._options.hubUrl){
    throw new Error('Please specify a hub url');
  }
  else{
    var re = new RegExp("^(http|https)://", "i"),
        match = re.test(this._options.hubUrl);
        if(!match) throw new Error('Please specify a valid hub url');
  }

  this.publishUpdate = function(){

  };

  this.lastResponse = function(){

  };

}

module.exports = Publisher;
