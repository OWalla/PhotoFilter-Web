var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Photo = new Schema({
    album: {
        type: Schema.ObjectId,
        ref: 'Album'
    },
    PathImageName: String,
    RedValue: Number,
    GreenValue: Number,
    BlueValue: Number,
    Brightness: Number,
    ColorBalance: Number,
    SharpnessLevel: Number,
    FacesInImageCount: Number,
    AreFacesInImage: Boolean,
    UserClassification: Number,
    networkScore: Number,
});

module.exports = mongoose.model('Photo', Photo);
