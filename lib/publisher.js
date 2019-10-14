
const validator = require('validator')
const request = require('request-promise')
const querystring = require('querystring')
const _ = require('underscore');


class Publisher {
    constructor(opts) {
        this._options = opts || {};

        if (!this._options.hubURL) {
            throw new Error('Please specify a hub url');
        }
        else {
            var isURL = validator.isURL(this._options.hubURL, { protocols: ['http', 'https'], require_protocol: true });
            if (!isURL) throw new Error('Please specify a valid hub url');
        }
    }

    /**
       * Notify the hub of new content on the topic url
       * @param topicURL string A URL or multiple urls separated by comma
     */
    publishUpdate = (topicURL) => {
        var postString = 'hub.mode=publish';
        if (!topicURL) {
            throw new Error('Please specify at least one topic url.');
        }
        const topicURLs = topicURL.split(',');
        _.each(topicURLs, function (url) {
            var isURL = validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true });
            if (!isURL) throw new Error('Please fix the URL: ' + url);
            postString += '&hub.url=' + encodeURIComponent(url);
        });
        return request.post(
            this._options.hubURL,
            {
                form: querystring.parse(postString),
                resolveWithFullResponse: true
            }
        ).then((response) => {
            this._lastResponse = response;
            return response;
        });

    }

    getLastResponse = () => {
        return this._lastResponse;
    };
}

module.exports = Publisher;
