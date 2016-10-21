const Model = require('../../lib/facade');
const userSchema = require('./user-schema');

const bcrypt = require('bcryptjs');

class UserModel extends Model {

  createUser(input, callback) {
    const user = new this.Schema(input);
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(input.password, salt, function (err, hash) {
        user.password = hash;
        user.save(callback);
      });
    });
  }

}

module.exports = new UserModel(userSchema);