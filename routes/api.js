var express = require('express');
var router = express.Router();
var request = require('request');

/* GET api listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	var lng = req.body.lng;
	var lat = req.body.lat;
	
	var twitter = twitter(lng, lat);
});

module.exports = router;

function twitter(lng, lat) {
	var url = 'https://api.twitter.com/1.1/search/tweets.json?q=&geocode=' + lat + ',' + lng + ',1mi';
	console.log('twitter url: ' + url);

	var options;
	options.url = url;
	options.method = 'POST';

	request(options, function(error, response, body) {
		console.log('response: ' + response);
		console.log('body: ' + body);
	});
}