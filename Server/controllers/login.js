var express = require('express');
var multer = require('multer');
var router = express.Router();
var User = require('../models/user.js');
var assert = require('assert');



router.post('/login', function (req, res) {
	var userName = req.body.userName;
	var Password = req.body.password;
	
	User.find({"Username" : userName, "Password" : Password}).exec(function (err, user){
		assert.equal(err, null);
		console.log(user);
		
		if (user.length == 1)
		{	
			req.session.user = user;
			res.render('/main');
		}
		else
		{
			res.redirect('/#/login');
		}
	});
	
 
});

module.exports = router;
