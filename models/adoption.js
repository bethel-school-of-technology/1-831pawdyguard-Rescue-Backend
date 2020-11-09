const mongoose = require('mongoose');

// mongoose schema configuration
const adoptionSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

// turn schema into a model 
module.exports = mongoose.model('Adoption', adoptionSchema);
