var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GeoLocoo' });
});

router.get('/search', function(req, res, next) {
	res.render('search', {title: 'Result Page'})
})

module.exports = router;
