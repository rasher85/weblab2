var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  email: String,
  password: String,
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);