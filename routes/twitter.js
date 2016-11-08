var express = require('express');
var router = express.Router();
var Twitter = require('twitter-node-client').Twitter;

router.get('/', function(req, res, next) {
	console.log('REQUEST: twitter');

	var parse = function (data) {
		var json = JSON.parse(data);

		var result = [];

		var statuses = json.statuses;
		statuses.forEach(function(current) {
			result.push({
				'type': 'twitter',
				'text': current.text,
				'username': current.user.screen_name,
				'name': current.user.name,
				'lat': current.geo.coordinates[0],
				'lng': current.geo.coordinates[1],
				'place': current.place.name,
				'time': new Date(current.created_at)
			});
		});

		return result;
	};

	var error = function (err, response, body) {
        res.send('Error: ' + err);
    };

    var success = function (data) {
        var result = parse(data);
        res.json(result);
    };

	var config = {
        "consumerKey": process.env.TWITTER_CONSUMERKEY,
        "consumerSecret": process.env.TWITTER_CONSUMERSECRET,
        "accessToken": process.env.TWITTER_ACCESSTOKENSECRET,
        "accessTokenSecret": process.env.TWITTER_ACCESSTOKENSECRET,
        "callBackUrl": process.env.TWITTER_CALLBACKURL
    }
	var twitter = new Twitter(config);

	var lat = req.query.lat;
	var lng = req.query.lng;
	var radius = req.query.radius;
	var count = req.query.count;

	twitter.getSearch(
		{
			'q': '-filter:retweets',
			'geocode': lat + ',' + lng + ',' + radius,
			'count': count
		}, error, success
	);
});

module.exports = router;
