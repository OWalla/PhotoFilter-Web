var express = require('express');
var multer = require('multer');
var router = express.Router();
var User = require('../models/user.js');
var assert = require('assert');
var jwt = require("jsonwebtoken");


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
          data: "Incorrect username/password"
        });
      }
    }
  });
});

router.post('/signup', function(req, res) {
  User.findOne({
    Username: req.body.username
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        console.log(user);
        res.json({
          type: false,
          data: "User already exists!"
        });
      } else {
        var userModel = new User();
        userModel.Username = req.body.username;
        userModel.Password = req.body.password;
        userModel.FirstName = req.body.first_name;
        userModel.LastName = req.body.last_name;
        userModel.Email = req.body.email;

        userModel.save(function(err, user) {
          user.token = jwt.sign(user, "process.env.JWT_SECRET");
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
