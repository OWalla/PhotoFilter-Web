var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

// Set up the app
var app = express();

// Enable POST request parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routings

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var networks = require('./controllers/network');
var albums = require('./controllers/albums');
app.use('/assets', express.static('assets'));

// Use jade engine
app.set('view engine', 'jade');

// Set up the routings
app.use('/', networks);
app.use('/', albums);

//connect to our database
//Ideally you will obtain DB details from a config file


// Start the app
app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
