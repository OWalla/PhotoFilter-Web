var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var album = new Schema({
  albumName: String,
  author: {
      type: Schema.ObjectId,
      ref: 'User'
  },
  photos : [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
})

module.exports = mongoose.model('Album', album);
