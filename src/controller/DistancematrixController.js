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
        var options = {};
        var responseBody = '';

        fs.readFile('apikey', function (err, content) {
            if (err && key === '') {
                return;
            }

            if (key === '') {
                key = content;
            }

            options = {
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

            https.request(options, function (response) {
                response.on('data', function (chunk) {
                    responseBody += chunk;
                });
                response.on('end', function () {
                    res.json(JSON.parse(responseBody));
                });
            }).end();
        });
    };
};

module.exports = DistancematrixController;
