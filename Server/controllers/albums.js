var express = require('express');
var multer = require('multer');
var router = express.Router();
var crypto = require('crypto');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var async = require('async');
var request = require('request');
var Album = require('../models/album.js')
var Photo = require('../models/photo.js')
var UserClassification = require('../models/userClassification.js')
var Cnn = require('../libs/cnn.js');
var config = require('config');

/* GET home page. */
router.get('/getUserAlbums/:user_id', function(req, res) {
  Album.find({}, function(err, albums) {
    console.log(albums);
    res.json(albums);
  });
});

router.get('/getAlbum/:album_id', function(req, res) {
  var albumId = req.params.album_id;
  Album.findById(albumId, function(err, albums) {
    if (err) {
      console.log(err);
    } else {
      Photo.find({
        album: albumId
      }, function(err, photos) {
        if (err) {
          console.log(err);
        } else {
          console.log(photos);
          res.json(photos);
        }
      })
    }
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var dir = './uploads/temp/'

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
  var album = new Album();
  album.albumName = req.body.albumId;
  album.save(function(err, albumDb) {
    var dir = './uploads/' + albumDb._id;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    for (var i = 0; i < req.files.length; i++) {
      var filePath = path.resolve(req.files[i].path);
      var dstFilePath = path.resolve(dir, path.basename(filePath));
      fs.renameSync(filePath, dstFilePath)
    }

    var fullPath = path.resolve(dir);

    var featureSrvConfig = config.get('PhotoFilter.featureServer');

    // Send HTTP Request to the featureRater with the full path to the album directory
    request(featureSrvConfig.addr + 'FeatureSrv/rater?src=' + fullPath, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var calls = [];
        var processError = null;
        var data = JSON.parse(body);
        // Go over each picture result, and save it to the DB.
        data.result.forEach(function(imageFeatrues) {
          calls.push(function(callback) {
            var photo = new Photo();
            photo.ImagePath = path.basename(imageFeatrues.FeatureSource);
            photo.album = albumDb._id;
            photo.RedValue = imageFeatrues.RedValue;
            photo.GreenValue = imageFeatrues.GreenValue;
            photo.BlueValue = imageFeatrues.BlueValue;
            photo.Brightness = imageFeatrues.Brightness;
            photo.ColorBalance = imageFeatrues.ColorBalance;
            photo.SharpnessLevel = imageFeatrues.SharpnessLevel;
            photo.FacesInImageCount = imageFeatrues.FacesInImageCount;
            photo.AreFacesInImage = imageFeatrues.AreFacesInImage;
            photo.UserClassification = UserClassification.Unknown.value;
            photo.networkScore = 5 // Cnn.predictImage('lie', photo);

            photo.save(function(err, photoInDb) {
              if (err) {
                return callback(err);
              }

              callback(null, imageFeatrues);
            })
          });
        });

        async.parallel(calls, function(err, result) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            res.json("Cool");
          }
        });
      }
    });
  });
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
