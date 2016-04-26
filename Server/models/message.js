var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var DisplaySettings = new Schema({
  fromDate: Date,
  toDate: Date,
  fromHour: Number,
  toHour: Number,
  weekdays: Number,
})

var Message = new Schema({
  messageName: String,
  texts: [String],
  images: [String],
  template: String,
  displayTime: Number,
  displaySettings: [DisplaySettings],
  screenIds: [Number]
});

module.exports = mongoose.model('Message', Message);
