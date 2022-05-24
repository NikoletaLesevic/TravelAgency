const express = require('express');
var User = require('../models/user')
var passport = require('./config/passport')

var router = express.Router();

router.post("/login", 
    passport.authenticate('local', { session: false }), (req, res) => {
    var user = req.user
    var token = user.generateJwt();
    res.status(200).json(token);
})

router.post("/register", (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;
    user.setPassword(req.body.password);

    user.save((err) => {
        if (!err) {
            var token = user.generateJwt();
            res.status(200).json(token);
        }
    })

})

router.post("/register-admin", (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;
    user.admin = true;
    user.setPassword(req.body.password);

    user.save((err) => {
        if (!err) {
            var token = user.generateJwt();
            res.status(200).json(token);
        }
    })

})

module.exports = router;
