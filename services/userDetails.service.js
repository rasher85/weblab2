var User = require('../models/usersDetails');
var config = require('../config.json');
var Q = require('q');

var service = {};

service.authenticate = update;

module.exports = service;

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    User.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.email !== userParam.email) {
            // username has changed so check if the new username is already taken
            User.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.email + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            institution: userParam.institution,
            additionalInfo: userParam.additionalInfo
            
        };

        var

        User.update(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}