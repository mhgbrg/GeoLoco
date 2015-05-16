var express = require('express');
var router = express.Router();
var Twitter = require('twitter-node-client').Twitter;
var request = require('request');

router.get('/', function(req, res, next) {
	var lat = req.query.lat;
	var lng = req.query.lng;

	console.log('lat: ' + lat);
	console.log('lng: ' + lng);
});

module.exports = router;