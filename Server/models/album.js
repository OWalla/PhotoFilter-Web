var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var album = new Schema({
  albumName: String
})

module.exports = mongoose.model('Album', album);
