var express = require('express');
var router = express.Router();
var Twitter = require('twitter-node-client').Twitter;

router.get('/', function(req, res, next) {
	var parse = function (data) {
		var json = JSON.parse(data);

		var result = [];

		var statuses = json.statuses;
		statuses.forEach(function(current) {
			result.push({
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
        console.log('ERROR [%s]', err);
        res.send('Error: ' + err);
    };

    var success = function (data) {
        // console.log('Data [%s]', data);
        // res.json(JSON.parse(data));
        var result = parse(data);
        res.json(result);
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
	var count = req.query.count;

	console.log('lat: ' + lat);
	console.log('lng: ' + lng);

	twitter.getSearch(
		{
			'q': '-filter:retweets',
			'geocode': lat + ',' + lng + ',1mi',
			'count': count
		}, error, success
	);
});

module.exports = router;