var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getStartingNetworks', function(req, res) {
  var networks = [{
      name: "Happy",
      description: "My favorite photos contain happy people",
      thumb_image: "/static/images/happy.png"
    }, {
      name: "Nature",
      description: "My favorite photos contain nature photos",
      thumb_image: "/static/images/nature.png"
    }, {
      name: "Dark",
      description: "My favorite photos are dark photos.",
      thumb_image: "/static/images/dark.png"
    }, ];

    res.json(networks);
});

router.get('/getNetwork/:id', function(req, res) {
  var network = true;
  res.json(network);
});

module.exports = router;
