// for mongoose db
const mongoose = require('mongoose');

// schema holds our custom configuration (fields, types of data)

const animalSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // hidden: { type: Boolean, default: false }, will add later
});

module.exports = mongoose.model('Animal', animalSchema);
