var express = require('express');
var Photo = require('../models/photo.js');
var Album = require('../models/album.js');
var Cnn = require('../libs/cnn.js')
var router = express.Router();

/* GET home page. */
router.get('/getStartingNetworks', function (req, res) {
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
    },];

    res.json(networks);
});
router.get('/trainNetwork', function (req, res) {
    // Find the album in the DB by it's name.
    Album.find({albumName: req.query.albumName}, function (err, albumCursor) {
        if (err)
            console.log(err);
        else {
            // Retrieve the album's photos by the album id.
            var photos = Photo.find({album: albumCursor[0]._id}).exec(function (err, photosArray) {
                    if (err)
                        console.log(err);
                    else {
                        // Train the network with these photos
                        var net = Cnn.trainFirstNetwork(photos);

                        //TODO: save the network on the server and redirect to the main page

                        // var prediction = Cnn.predictImage(net, photosArray[1]);
                        // console.log('prediction is: ' + prediction.w[0]);
                        res.send(net);
                    }
                }
            );
        }
    });
})
;

router.get('/getNetwork/:id', function (req, res) {
    var network = true;
    res.json(network);
});

module.exports = router;
