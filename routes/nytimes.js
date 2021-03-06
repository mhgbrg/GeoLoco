var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('underscore');

router.get('/', function(req, res, next) {
	var lat = parseFloat(req.query.lat);
	var lng = parseFloat(req.query.lng);
	var radius = parseInt(req.query.radius);

	var getLocations = function (lat, lng, radius, callback) {
		var coordDiff = radius / 100 / 2;
		var northEastLat = lat + coordDiff;
		var northEastLng = lng + coordDiff;
		var southWestLat = lat - coordDiff;
		var southWestLng = lng - coordDiff;

		// console.log('orig: ' + lat + ',' + lng);
		// console.log('one: ' + northEastLat + ',' + northEastLng);
		// console.log('two: ' + southWestLat + ',' + southWestLng);

		var url = 'http://api.nytimes.com/svc/semantic/v2/geocodes/query.json';
		url = url + '?bounding_box=' + northEastLat + ',' + northEastLng + ',' + southWestLat + ',' + southWestLng;
		// url = url + '?nearby=' + lat + ',' + lng;
		url = url + '&api-key=' + process.env.NYTIMES_API_KEY;

		var parse = function (data) {
			var json = JSON.parse(data);

			var results = [];

			var places = json.results;
			places.forEach(function(current) {
				results.push({
					'concept_name': current.concept_name,
					'name': current.geocode.name,
					'lat': current.geocode.latitude,
					'lng': current.geocode.longitude
				});
			});

			return results;
		};

		var options = {
		    url: url,
		    method: 'GET'
		};

		console.log(url);
		request(options, function(error, response, body) {
			var result = parse(body);
		    callback(result);
		    // res.json(result);
		});
	};

	var getArticles = function(place, callback) {
		var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
		// url = url + '?filter-field:glocations:("Times Square")';
		url = url + '?q=' + place.name;
		url = url + '&sort=newest';
		url = url + '&api-key=' + process.env.NYTIMES_API_KEY;

		var parse = function (data) {
			var json = JSON.parse(data);

			var result = [];

			var articles = json.response.docs;
			articles = _.first(articles, 3);

			articles.forEach(function(current) {
				result.push({
					'type': 'nytimes',
					'url': current.web_url,
					'headline': current.headline.main,
					'snippet': current.snippet,
					// 'type_of_material': current.type_of_material,
					'time': current.pub_date,
					'lat': place.lat + (Math.random() - 0.5) / 100,
					'lng': place.lng + (Math.random() - 0.5) / 100
				});
			});

			return result;
		};

		var options = {
		    url: url,
		    method: 'GET'
		};

		console.log(url);
		request(options, function(error, response, body) {
			var result = parse(body);
		    callback(result);
		});
	};

	var numberOfResults = 0;
	var count = 0;
	var finalResult = [];
	getLocations(lat, lng, radius, function(places) {
		numberOfResults = places.length;

		if (numberOfResults === 0) {
			res.json([]);
		}

		places.forEach(function(place){
			getArticles(place, function(result) {
				finalResult = finalResult.concat(result);

				count++;
				if (count === numberOfResults) {
					res.json(finalResult);
				}
			});
		});
	});
});

module.exports = router;
