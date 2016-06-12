var express = require('express');
var multer = require('multer');
var router = express.Router();
var User = require('../models/user.js');
var assert = require('assert');


router.post('/authenticate', function(req, res) {
  User.findOne({
    Username: req.body.username,
    Password: req.body.password
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: true,
          data: user,
          token: user.token
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect email/password"
        });
      }
    }
  });
});

router.post('/signin', function(req, res) {
  User.findOne({
    Username: req.body.username,
    Password: req.body.password
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: false,
          data: "User already exists!"
        });
      } else {
        var userModel = new User();
        userModel.email = req.body.email;
        userModel.password = req.body.password;
        userModel.FirstName = req.body.FirstName;
        userModel.LastName = req.body.LastName;
        userModel.Email = req.body.Email;
        userModel.StartingNetworkName = req.body.startingNetwork;
        userModel.CurrentNetworkData = get_network_data(req.body.startingNetwork);

        userModel.save(function(err, user) {
          user.token = jwt.sign(user, process.env.JWT_SECRET);
          user.save(function(err, user1) {
            res.json({
              type: true,
              data: user1,
              token: user1.token
            });
          });
        })
      }
    }
  });
});

module.exports = router;
