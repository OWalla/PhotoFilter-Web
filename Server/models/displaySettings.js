var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var displaySettingsSchema = new Schema({
  fromDate: Date,
  toDate: Date,
  fromHour: Number,
  toHour: Number,
  weekdays: Number,
})

module.exports = mongoose.model('displaySettings', displaySettingsSchema);
