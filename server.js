'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var database = require('./db/components');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));

// Make app a public folder
app.use('/', express.static(__dirname + '/App'));


// list all components
app.get('/components', function(req, res) {
  database.getComponents(function(err, components) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(components);
    }
  });
});

// Add a component
app.put('/components', function(req, res) {
  var component = {};
  component.name = req.body.name;
  component.email = req.body.email;
  component.endpoint = req.body.endpoint;
  component.phone = req.body.phone;  
  database.addComponent(component, function(err, component) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(component);
    }
  });
});
// edit a component
app.post('/components', function(req, res) {
  var component = {};
  component.id = req.body.id;
  component.name = req.body.name;
  component.email = req.body.email;
  component.endpoint = req.body.endpoint;
  component.phone = req.body.phone;  
  database.updateComponent(component, function(err, component) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(component);
    }
  });
});



// delete a component
app.delete('/components', function(req, res) {
  database.deleteComponent(req.body.id, function(err, component) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(component);
    }
  });
});

var port = process.env.PORT || 8001;
var host = process.env.HOST || '0.0.0.0';
console.log('Starting dev REST server on http://%s:%d/', host, port);
app.listen(port, host);