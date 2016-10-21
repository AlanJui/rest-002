const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var userController;

exports.setup = function(controller /*, config */) {

  userController = controller;

  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      userController.model.findOne({ username })
        .then((user) => {
          // Return if user not found in DB
          if (!user) {
            return done(null, false, {
              message: 'Unknown User'
            });
          }

          user.comparePassword(password, user.password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) {
              return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
          });

        })
        .catch(err => done(err));
    }
  ));

};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userController.model.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

