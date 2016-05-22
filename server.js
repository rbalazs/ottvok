'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.static('public'));

app.get('/distancematrix/*', function (req, res) {
    var DistancematrixController = require('./src/controller/DistancematrixController');
    var distancematrixController = new DistancematrixController();
    distancematrixController.run(req, res);
});

app.listen(process.env.PORT || PORT);
