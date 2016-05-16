"use strict";

/**
 * Backend proxy to use Google Maps Distance Matrix API.
 *
 * @constructor
 */
var DistancematrixController = function () {

    /**
     * Handle express js request-response.
     *
     * @param req
     * @param res
     */
    this.run = function (req, res) {
        var param = require('jquery-param');
        var https = require('https');
        var fs = require('fs');
        var key = process.env.API_KEY || '';

        fs.readFile('apikey', function (err, content) {
            if (err && key === '') {
                console.log('Error loading client secret file (apikey): ' + err);
                return;
            }
            if (key === '') {
                key = content;
            }

            var options = {
                host: 'maps.googleapis.com',
                path: '/maps/api/distancematrix/json?' + param(
                    {
                        'origins': 'rákosfalva part',
                        'destinations': 'mészáros utca',
                        'key': key,
                        'mode': 'driving',
                        'traffic_model': 'best_guess',
                        'departure_time': 'now'
                    }
                ),
                port: 443,
                method: 'GET'
            };

            var body = '';

            https.request(options, function (response) {
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', function () {
                    res.json(JSON.parse(body));
                });
            }).end();
        });
    }
};

module.exports = DistancematrixController;