var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

router.get('/', function(req, res, next) {
	var lat = req.query.lat;
	var lng = req.query.lng;

	console.log('lat: ' + lat);
	console.log('lng: ' + lng);

	async.parallel({
	    twitter: function(callback) {
	    	var url = 'http://localhost:1337/api/twitter?lat=' + lat + '&lng=' + lng + '&radius=1km&count=100';
	    	var options = {
		        url: url,
		        method: 'GET'
		    };

		    console.log(url);
	    	request(options, function(error, response, body) {
		        callback(null, JSON.parse(body));
		    });
	    },
	    instagram: function(callback) {
	        var url = 'http://localhost:1337/api/instagram?lat=' + lat + '&lng=' + lng + '&radius=1km';
	    	var options = {
		        url: url,
		        method: 'GET'
		    };

		    console.log(url);
	    	request(options, function(error, response, body) {
		        callback(null, JSON.parse(body));
		    });
	    },
	    nytimes: function(callback) {
	        var url = 'http://localhost:1337/api/nytimes?lat=' + lat + '&lng=' + lng + '&radius=10';
	    	var options = {
		        url: url,
		        method: 'GET'
		    };

		    console.log(url);
	    	request(options, function(error, response, body) {
		        callback(null, JSON.parse(body));
		    });
	    },
	    yikyak: function(callback) {
	        var url = 'http://localhost:1337/api/yikyak?lat=' + lat + '&lng=' + lng;
	    	var options = {
		        url: url,
		        method: 'GET'
		    };

		    console.log(url);
	    	request(options, function(error, response, body) {
		        callback(null, JSON.parse(body));
		    });
	    },
	}, function(err, results) {
		res.json(results);
	});
});

module.exports = router;