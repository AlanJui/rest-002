const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./user');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Show Register Form
router.get('/register', function (req, res) {
  res.render('./user/register');
});

// Register User
router.post('/register', function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  // console.log(`name = ${name}`);
  // console.log(`req.body = ${req.body}`);

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);

  let errors = req.validationErrors();

  if (errors) {
    // console.log(`Validation failed`);
    res.render('./users/register', {
      errors: errors
    });
  } else {
    // console.log(`Validation Passed`);
    let newUser = new User({
      name,
      email,
      username,
      password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;

      console.log(`user = ${user}`);
      req.flash('success_msg', 'You are registered and can now login');
      res.redirect('/users/login');
    });

  }
});

// Passport Configuration
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getByUsername(username, function (err, user) {
      if (err) throw err;

      if (!user) return done(null, false, {message: 'Unknown User'});

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getById(id, function(err, user) {
    done(err, user);
  });
});

// Login Form
router.get('/login', function (req, res) {
  res.render('./user/login');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    res.redirect('/');
  });

// Logout
router.get('/logout', function (req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
