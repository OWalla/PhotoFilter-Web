var express = require('express');
var Photo = require('../models/photo.js');
var Album = require('../models/album.js');
var Svm = require('../libs/svm.js')
var fs = require('fs');
var jsonfile = require('jsonfile');
var config = require('config');
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
router.get('/trainSVM', function (req, res) {

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

                        var labels = [];
                        photosArray.forEach(function(element, index){
                            labels.push(element.UserClassification);
                        });

                        // Train the network with these photos
                        var trainedSVM = Svm.trainFirstSVM(photosArray, labels);

                        var SVMConfig = config.get('PhotoFilter.SVM');
                        var dir = SVMConfig.rootFolder;

                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        };

                        var file = dir + req.query.SVMName + '.json'
                        jsonfile.writeFile(file, trainedSVM, function (err) {
                            console.error(err)
                        })

                        // var prediction = Svm.predictImage(net, photosArray[1]);
                        // console.log('prediction is: ' + prediction.w[0]);
                        res.send(trainedSVM);
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
