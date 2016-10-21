const Router = require('express').Router;
const router = new Router();

const controller = require('./user-controller');
const passport = require('passport');
const passportConfig = require('../../lib/auth/passport-config');

passportConfig.setup(controller);

router.route('/register')
  .get((...args) => controller.registerForm(...args))
  .post((...args) => controller.register(...args));

router.route('/login')
  .get((...args) => controller.loginForm(...args))
  .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }));

router.route('/logout')
  .get((...args) => controller.logout(...args));

module.exports = router;

