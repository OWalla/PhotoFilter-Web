var express = require('express');
var multer = require('multer');
var router = express.Router();
var crypto = require('crypto');
var mime = require('mime');
var fs = require('fs');

/* GET home page. */
router.get('/getUserAlbums/:user_id', function(req, res) {
    var albums = [{
        albumId: 1,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, {
        albumId: 2,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, {
        albumId: 2,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, {
        albumId: 2,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, {
        albumId: 2,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, {
        albumId: 2,
        name: "Twitter",
        thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
        albumId: 2,
        name: "Flower",
        thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
        albumId: 2,
        name: "Linux",
        thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
        albumId: 2,
        name: "Cyber",
        thumb_image: "http://media02.hongkiat.com/photo-manipulation-animals/monkey-bot.jpg"
    }, ];

    res.json(albums);
});

router.get('/getAlbum/:album_id', function(req, res) {
    var albumName = "Name 1";
    var photos = [{
        label: "Picture 1",
        src: "http://images.math.cnrs.fr/IMG/png/section8-image.png",
        classification: 'liked'
    }, {
        label: "Picture 2",
        src: "http://images.math.cnrs.fr/IMG/png/section8-image.png",
        classification: 'disliked'
    }, {
        label: "Picture 3",
        src: "http://images.math.cnrs.fr/IMG/png/section8-image.png",
        classification: 'default'
    }];


    res.json({
        albumName: albumName,
        photos: photos
    });
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dir = './uploads/' + req.body.albumId;
        console.log(dir);
        var fs = require('fs');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

var uploading = multer({
    storage: storage
});

router.post('/upload', uploading.any(), function(req, res) {
    // At this point, all the images were uplaoded to /uploads/albumId
    // TODO: We need to get all the images form that folder
    // send each image id + path to our feature extraction
    // and save it to the db.

    // NO NEED TO TRAIN THE NETWORK, we need to estimate the score using the network.

    res.json(req.body);
});

router.post('/sendUpdates', function(req, res) {

    console.log(req.body);
    console.log(req.body.albumId);
    console.log(req.body.classifications);

    // TODO: Update the album pictrues with the new classifications

    // TODO: Call network train

    res.json("Cool!");
});

module.exports = router;
