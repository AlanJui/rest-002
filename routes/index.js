const express = require('express');
const router = express.Router();

const user = require('../model/user/user-router');

// Routing Index
router.use('/users', user);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('../views/index', { title: 'RESTful API Server' });
// });
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('../views/index', { title: 'RESTful API Server' });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}


module.exports = router;
