var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var ScientistSchema = new Schema({
      type: String,
      name: {first: String, last: { type: String, trim: true } },
      dates: { birth: Number, death: Number, acheivement: [Number]},
      age: { type: Number, min: 0, max: 165},
      knownFor: String, //https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers/
      discipline: String,
      living: Boolean
    },{toObject:{virtuals:true},toJSON:{virtuals: true}});


// Virtual
ScientistSchema
.virtual('fullName')
.get(function () {  return this.name.first + ' ' + this.name.last; });

//Export model
module.exports = mongoose.model('Scientist', ScientistSchema);
