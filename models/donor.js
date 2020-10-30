const mongoose = require('mongoose');

// mongoose schema configuration
const donorSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  street: { type: String, required: true },
  street2: { type: String},
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  wantsLetter: { type: String, required: true }
});

// turn schema into a model 
module.exports = mongoose.model('Donor', donorSchema);

