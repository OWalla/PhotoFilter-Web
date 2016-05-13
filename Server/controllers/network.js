var express = require('express');
var Photo = require('../models/photo.js');
var Cnn = require('../libs/cnn.js')
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
router.get('/trainNetwork',function(req,res){
  var photos = Photo.find({album: '573391407250282c2b33735e'}).exec(function(err, photosArray){
    if (err)
      console.log(err);
    else {
      var net = Cnn.trainFirstNetwork(photos);
      var prediction = Cnn.predictImage(net, photosArray[10]);
      console.log('prediction is: ' + prediction.w[0]);
      res.send(net);
    }

  });

});

router.get('/getNetwork/:id', function(req, res) {
  var network = true;
  res.json(network);
});

module.exports = router;
