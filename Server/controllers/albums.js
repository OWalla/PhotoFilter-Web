var express = require('express');
var router = express.Router();

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

router.post('/sendUpdates', function(req, res) {

    console.log(req.body);
    console.log(req.body.albumId);
    console.log(req.body.classifications);

    // TODO: Update the album pictrues with the new classifications

    // TODO: Call network train

    res.json("Cool!");
})

module.exports = router;
