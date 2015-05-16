var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	var lng = req.body.lng;
	var lat = req.body.lat;


});

module.exports = router;
