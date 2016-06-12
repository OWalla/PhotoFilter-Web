var Enum = require('enum');

var UserClassification = new Enum({'Unknown': 0, 'Liked': 1, 'Disliked': -1});

module.exports = UserClassification;
