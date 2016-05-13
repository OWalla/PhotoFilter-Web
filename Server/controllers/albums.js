var express = require('express');
var multer = require('multer');
var router = express.Router();
var crypto = require('crypto');
var config = require('config');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var async = require('async');
var request = require('request');
var Album = require('../models/album.js')
var Photo = require('../models/photo.js')
var UserClassification = require('../models/userClassification.js')
var Cnn = require('../libs/cnn.js');
var jimp = require("jimp");

/* GET home page. */
router.get('/getUserAlbums/:user_id', function(req, res) {
  Album.find({}).populate('photos').exec(function(err, albums) {
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
      }).sort({
        FacesInImageCount: 'desc',
        GreenValue: 'descending'
      }).exec(function(err, photos) {
        if (err) {
          console.log(err);
        } else {
          var resultObject = {
            albumName: albums.albumName,
            photos: photos
          }
          res.json(resultObject);
        }
      })
    }
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var uploadConfig = config.get('PhotoFilter.upload');
    var dir = uploadConfig.rootFolder + uploadConfig.tempFolder;

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
    var uploadConfig = config.get('PhotoFilter.upload');
    var dir = uploadConfig.rootFolder + albumDb._id;;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    var fullPath = path.resolve(dir);

    for (var i = 0; i < req.files.length; i++) {
      var filePath = path.resolve(req.files[i].path);
      var dstFilePath = path.resolve(dir, path.basename(filePath));
      fs.renameSync(filePath, dstFilePath);
    }

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
            photo.PathImageName = path.basename(imageFeatrues.Src);
            photo.album = albumDb._id;
            photo.RedValue = imageFeatrues.Features.RedValue;
            photo.GreenValue = imageFeatrues.Features.GreenValue;
            photo.BlueValue = imageFeatrues.Features.BlueValue;
            photo.Brightness = imageFeatrues.Features.Brightness;
            photo.ColorBalance = imageFeatrues.Features.ColorBalance;
            photo.SharpnessLevel = imageFeatrues.Features.SharpnessLevel;
            photo.FacesInImageCount = imageFeatrues.Features.FacesInImageCount;
            photo.AreFacesInImage = imageFeatrues.Features.AreFacesInImage;
            photo.UserClassification = UserClassification.Unknown.value;
            photo.networkScore = 5; // Cnn.predictImage('lie', photo);
            photo.save(function(err, photoInDb) {
              if (err) {
                return callback(err);
              }

              albumDb.photos.push(photo);
              callback(null, imageFeatrues);
            })
          });
        });

        async.parallel(calls, function(err, result) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            albumDb.save();
            res.redirect('/');
          }
        });
      }
    });


    // Create thumbnails
    fs.readdir(dir, function(err, files) {
      if (err) {
        console.log(err);
      } else {
        files.forEach(function(file) {
          var dstFilePath = path.resolve(dir, path.basename(file));
          var dstExtension = path.extname(dstFilePath);
          var dstFileName = path.basename(dstFilePath, dstExtension);
          jimp.read(dstFilePath, function(err, image) {
            var thumbFileName = dir + '/' + dstFileName + '_thumb' + dstExtension;
            console.log(thumbFileName);
            image.resize(100, jimp.AUTO).quality(60).write(thumbFileName);
          });
        });
      }
    });
  })
});

function updatePhotoUserClassifcation(photo, classifcation) {
  // get photo by id from db
  Photo.findById(photo._id, function(err, photoInDb) {

    // update classifications
    photoInDb.UserClassification = classifcation;

    //save to db
    photoInDb.save();
  });
}

router.post('/sendUpdates', function(req, res) {
  var albumId = req.body.albumId;
  var userClassifications = req.body.classifications;

  for (i = 0; i < userClassifications.liked.length; ++i) {
    updatePhotoUserClassifcation(userClassifications.liked[i], UserClassification.Liked.value);
  }

  for (i = 0; i < userClassifications.disliked.length; ++i) {
    updatePhotoUserClassifcation(userClassifications.disliked[i], UserClassification.Disliked.value);
  }

  for (i = 0; i < userClassifications.default.length; ++i) {
    updatePhotoUserClassifcation(userClassifications.default[i], UserClassification.Unknown.value);
  }

  // TODO: Call network train

  res.json("Cool!");
});

module.exports = router;
