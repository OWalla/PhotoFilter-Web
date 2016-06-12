var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    Username: String,
    Password: String,
    FirstName: String,
    LastName: String,
    Email: String,
    StartingNetworkName: String,
    CurrentNetworkData: String,
    token: String,
    albums : [{ type: Schema.Types.ObjectId, ref: 'Album' }]
});

module.exports = mongoose.model('User', User);
