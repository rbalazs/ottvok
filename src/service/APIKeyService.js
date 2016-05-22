"use strict";

/**
 * Service that provides Google Api Key in every env.
 *
 * @constructor
 */
var APIKeyService = function () {
    /**
     * Returns the key.
     *
     * Loads up key from disk, if it is not provided as an env variable.
     *
     * @return {Promise}
     */
    this.getKey = function () {
        return new Promise(function (resolve, reject) {
            var key = process.env.API_KEY || '';
            var fs;
            if (key === '') {
                fs = require('fs');
                fs.readFile('apikey', function (err, content) {
                    if (err && key === '') {
                        return reject('Failed to load key from disk.');
                    }

                    return resolve(content);
                });
            } else {
                return resolve(key);
            }
        });
    };
};

module.exports = APIKeyService;
