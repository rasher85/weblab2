var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs');

var tempUserSchema = mongoose.Schema({
  email: {type: String},
  password: {type: String},
    GENERATED_VERIFYING_URL: {type: String},
    dateRegistered: {type: String, required: true, default: Date.now},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    status: {type: String, required: true, default: 'student'}, //student, admin, teacher
    institution: {type: String, required: true},
    additionalInfo: {type: String},
});

tempUserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('TempUser', tempUserSchema);
