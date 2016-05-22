"use strict";

/**
 * Backend proxy to use Google Maps Distance Matrix API.
 *
 * @constructor
 */
var DistanceMatrixProxy = function () {
   /**
    * Visszaadja a letoltott adatokat.
    *
    * @param key
    * @param origin
    * @param destenation
    * @param time
    *
    * @return {Promise}
    */
    this.downloadData = function (key, origin, destenation, time) {
        var https = require('https');
        var param = require('jquery-param');

        return new Promise(function (resolve, reject) {
            var body = [];
            var options = {
                host: 'maps.googleapis.com',
                path: '/maps/api/distancematrix/json?' + param(
                    {
                        'origins': origin,
                        'destinations': destenation,
                        'key': key,
                        'mode': 'driving',
                        'traffic_model': 'best_guess',
                        'departure_time': time
                    }
                ),
                port: 443,
                method: 'GET'
            };

            https.request(options, function (response) {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    return reject(new Error('Request failed with status code: ' + response.statusCode));
                }
                response.on('data', function (chunk) {
                    body.push(chunk);
                });
                response.on('end', function () {
                    return resolve(body.join(''));
                });
            }).end();
        });
    };
};

module.exports = DistanceMatrixProxy;
