'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.static('public'));

app.get('/distancematrix/*', function (req, res) {
    var https = require('https');
    var fs = require('fs');
    var key = process.env.API_KEY || '';

    fs.readFile('apikey', function (err, content) {
        if (err) {
            console.log('Error loading client secret file (apikey): ' + err);
            return;
        }

        if (key === '') {
            key = content;
        }

        var options = {
            host: 'maps.googleapis.com',
            path: '/maps/api/distancematrix/json?origins=r%C3%A1kosfalva%20park&destinations=m%C3%A9sz%C3%A1ros%20utca&key=' + key + '&mode=driving&traffic_model=best_guess&departure_time=now',
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
});

app.listen(process.env.PORT || PORT)
