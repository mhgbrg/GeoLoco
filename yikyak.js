/* Require stuff */
var uuid = require('node-uuid');
var request = require('request');
var qs = require('querystring');
var crypto = require('crypto');

/* Default variables */
var baseURL = "https://us-west-api.yikyakapi.net";
var key = "F7CAFA2F-FE67-4E03-A090-AC7FFF010729";
var userid = uuid.v4().toUpperCase(); // Generate a v4 UUID

/* Times Square */
var lat = 40.758899;
var lng = -73.985131;

/* Gothenburg */
// var lat = 57.709086;
// var lng = 11.974514;

var options = {
	headers: {
		"User-Agent": "Yik Yak/2.1.0.23 (iPhone; iOS 8.1; Scale/2.00)"
	}
}

// Simply the current time in seconds since epoch
function getSalt() {
	return Math.round((new Date().getTime()) / 1000);
}

// Returns a querystringed path from param object
function getPath(url, params) {
	return url + '?' + qs.stringify(params);
}

function getHash(url, key, salt) {
	// Create a hmac object
	var hmac = crypto.createHmac('sha1', key)

	// Fill it with content and digest it
	var hash = hmac.update(url + salt).digest('base64');

	// Remove foul characters before returning
	return hash.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
}

function registerUser(callback) {
	var url = "/api/registerUser";

	var params = {
		'userID': userid,
		'userLat': lat,
		'userLong': lng
	}

	var path = getPath(url, params);
	var salt = getSalt();
	var hash = getHash(path, key, salt);

	params.salt = salt;
	params.hash = hash;

	var fullPath = baseURL + getPath(url, params);

	options.url = fullPath;
	options.method = 'POST';

	request(options, function(error, response, body) {
		callback();
	});
}

function getMessages(callback) {

	var url = "/api/getMessages";

	var params = {
		'userID': userid,
		'lat': lat,
		'long': lng,
		'userLat': lat,
		'userLong': lng
	}

	var path = getPath(url, params);

	var salt = getSalt();
	var hash = getHash(path, key, salt);

	params.salt = salt;
	params.hash = hash;

	var fullPath = baseURL + getPath(url, params);

	options.url = fullPath;

	request(options, function(error, response, body) {
		callback(JSON.parse(body).messages);
	});

}

registerUser(function() {
	getMessages(function(messages) {
		// A message contains: message, latitude, longitude, time, numberOfLikes...
		messages.forEach(function(message) {
			console.log(message.time +': '+ message.message);
		});
	});
});
