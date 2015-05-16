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

router.get('/twitter', function(req, res, next) {
	var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };

    var success = function (data) {
        console.log('Data [%s]', data);
    };

	var config = {
        "consumerKey": "3RbzvJ30rQDcabzAIOCD8UXZP",
        "consumerSecret": "rzbJpZ4yuLfXVCRTo0uQ7cVtEoK6p0j8zuE2I9UY5uFgwjn2HV",
        "accessToken": "3256414203-2IzAtXwcQgispyGrc0wBuHL7XKUfsJBgBEfcyZ7",
        "accessTokenSecret": "6NcFh5H0n2IKbCnQ3ZuOrV6kAAHP8Hva6s6RHJwz5FHWh",
        "callBackUrl": "www.henriknilson.com"
    }
	var twitter = new Twitter(config);

	var lat = req.query.lat;
	var lng = req.query.lng;

	console.log('lat: ' + lat);
	console.log('lng: ' + lng);

	twitter.getSearch({
			'q': '',
			'geocode': lat + ',' + lng + ',1mi',
			'count': 10
		}, error, success
	);
});

module.exports = router;