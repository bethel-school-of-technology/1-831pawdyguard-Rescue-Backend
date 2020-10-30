const express = require("express");

const Donor = require('../models/donor');

const router = express.Router();


// ***** Save new donor information *****
router.post('', (req, res, next) => {
  const donor = new Donor({
    fname: req.body.fname,
    lname: req.body.lname,
    street: req.body.street,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    phone: req.body.phone
    
  });

  donor.save().then(newDonor => {
    console.log(newDonor);
    res.status(201).json({
      message: 'Donor information received'
    }); 
  });
});

module.exports = router;