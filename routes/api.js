var express = require('express');
var router = express.Router();
var request = require('request');

/* GET api listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	var lat = req.body.lat;
	var lng = req.body.lng;

	console.log('lat: ' + lat);
	console.log('lng: ' + lng);
});

router.post('/twitter', function(req, res, next) {
	var lat = req.body.lat;
	var lng = req.body.lng;

	var url = 'https://api.twitter.com/1.1/search/tweets.json?q=&geocode=' + lat + ',' + lng + ',1mi';
	console.log('twitter url: ' + url);

	var options;
	options.url = url;
	options.method = 'POST';

	request(options, function(error, response, body) {
		console.log('error: ' + error);
		console.log('response: ' + response);
		console.log('body: ' + body);
	});
});

module.exports = router;