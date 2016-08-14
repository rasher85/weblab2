var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs');

var userDetailsSchema = mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true, default: ""},
    lastName: {type: String, required: true, default: ""},
    institution: {type: String, required: true, default: ""},
    status: {type: String, required: true, default: ""},
    additionalInfo: {type: String, required: true, default: ""},
});


};

module.exports = mongoose.model('UsersDetails', userDetailsSchema);