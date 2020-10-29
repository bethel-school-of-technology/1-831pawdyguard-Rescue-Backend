const mongoose = require('mongoose');

//schema holds our custom configuration for Animal (fields, types of data)
const animalSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
  // ,creator:{ type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true}
});

module.exports = mongoose.model('Animal', animalSchema);
