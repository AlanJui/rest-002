const Controller = require('../../lib/controller');
const UserModel = require('./user-model');

class UserController extends Controller {

  registerForm(req, res, next) {
    res.render('./user/register');
  }

  register(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);

    const errors = req.validationErrors();

    if (errors) {
      // console.log(`Validation failed`);
      res.render('./users/register', {
        errors: errors
      });
    } else {
      // console.log(`Validation Passed`);
      const data = {
        name,
        email,
        username,
        password
      };

      this.model.createUser(data, function (err, user) {
        if (err) { throw err; }

        console.log(`user = ${user}`);
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
      });
    }
  }

  loginForm(req, res, next) {
    res.render('./user/login');
  }

  logout(req, res, next) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  }

}

module.exports = new UserController(UserModel);