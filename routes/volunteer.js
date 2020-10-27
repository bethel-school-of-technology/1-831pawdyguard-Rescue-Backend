const express = require("express");

const Volunteer = require('../models/volunteer');

const router = express.Router();


// ***** Add new volunteer *****
router.post('', (req, res, next) => {
  // makes a new javascript object
  const volunteer = new Volunteer({
    fname: req.body.fname,
    lname: req.body.lname,
    street: req.body.street,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    phone: req.body.phone,
    details: req.body.details,
    ownsAnimal: req.body.ownsAnimal,
    skills: req.body.skills
  });

  volunteer.save().then(newVolunteer => {
    console.log(newVolunteer);
    res.status(201).json({
      message: 'Volunteer application received'
    }); 
  });
});

module.exports = router;