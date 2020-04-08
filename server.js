'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
//////////////

const handleFlight = (req, res) => {
    const { flightNumber } = req.params;

    const allFlights = Object.keys(flights);

    console.log(allFlights.includes(flightNumber));

    if (allFlights.includes(flightNumber)) {
        res.send(flights[flightNumber])
    } else {
        res.status(404)
    }
}

const PORT = process.env.PORT || 8000;

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // endpoints
    ////// create endpoint for the flight number 
    .get("/correctFlight/:flightNumber", handleFlight)
    //.get('/confirmed/:flightNumber', handle)
    //////
    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));