var config = require('config.json');
var express = require('express');
var router = express.Router();
var userDetailsService = require('../../services/userDetails.service');

// routes
router.post('/update', update);


module.exports = router;

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userDetailsService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}