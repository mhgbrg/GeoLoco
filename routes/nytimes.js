var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	var lat = parseFloat(req.query.lat);
	var lng = parseFloat(req.query.lng);

	// var northEastLat = lat + 0.005;
	// var northEastLng = lng + 0.005;
	// var southWestLat = lat - 0.005;
	// var southWestLng = lng - 0.005;
	// console.log('orig: ' + lat + ',' + lng);
	// console.log('one: ' + northEastLat + ',' + northEastLng);
	// console.log('two: ' + southWestLat + ',' + southWestLng);

	var url = 'http://api.nytimes.com/svc/semantic/v2/geocodes/query.json';
	// url = url + '?bounding_box=' + northEastLat + ',' + northEastLng + ',' + southWestLat + ',' + southWestLng;
	url = url + '?nearby=' + lat + ',' + lng;
	url = url + '&api-key=29bfaf2ab93fe7b43fca4c6c4ece772f:1:72094865';

	var options = {
	    url: url,
	    method: 'GET'
	};

	request(options, function(error, response, body) {
	    res.json(JSON.parse(body));
	});
});

module.exports = router;