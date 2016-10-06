var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RESTful API Server' });
});

router.get('/healthcheck', function (req, res) {
  var response = {
    message: 'OK'
  };
  res.send(response);
});

module.exports = router;
