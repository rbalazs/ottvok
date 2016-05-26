'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.static('public'));

app.get('/distancematrix/getJSONWithProxy/:originAddresses/:destinationAddresses/:time',
    function (request, response) {
        var originAddresses = request.params.originAddresses;
        var destinationAddresses = request.params.destinationAddresses;
        var time = request.params.time;

        var DistanceMatrixController = require('./src/controller/DistanceMatrixController');
        var DistanceMatrixProxy = require('./src/proxy/DistanceMatrixProxy');
        var APIKeyService = require('./src/service/APIKeyService');

        var controller = new DistanceMatrixController();

        controller.execute(
            response,
            {
                'time' : time,
                'originAddresses' : originAddresses,
                'destinationAddresses' : destinationAddresses
            },
            new APIKeyService(),
            new DistanceMatrixProxy()
        );
});

app.listen(process.env.PORT || PORT);
