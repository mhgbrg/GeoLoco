var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
    var lat = req.query.lat;
    var lng = req.query.lng;
    var cid = "984943bd8fe74b70b0959b42494cd294";
    var url = 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lng + '&client_id=' + cid;
    var options = {
        url: url,
        method: 'GET'
    };

    var parse = function(data) {
        var result = [];
        var json = JSON.parse(data);

        var posts = json.data;

        posts.forEach(function(post) {
            result.push({
                username: post.user.username,
                caption: post.caption.text ? post.caption.text : '',
                lat: post.location.latitude,
                lng: post.location.longitude,
                time: new Date(post.created_time * 1000),
                profile_picture: post.user.username,
                full_name: post.user.full_name,
                images: {
                    big: post.images.standard_resolution,
                    medium: post.images.low_resolution,
                    thumbnail: post.images.thumbnail
                }
            });
        });

        return result;

    };

    request(options, function(error, response, body) {
        res.json(parse(body));
    });

});

module.exports = router;