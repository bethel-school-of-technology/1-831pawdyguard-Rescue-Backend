const Volunteer = require('../models/volunteer');

exports.saveVolunteer = (req, res, next) => {
  //console.log('In controllers exports.SaveVolunteer');
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
    skills: req.body.skills,
    volchoice:req.body.volchoice,
    timestamp:req.body.timestamp
  });

  volunteer.save().then(newVolunteer => {
    //console.log(newVolunteer);
    res.status(201).json({
      message: 'Volunteer application received'
    }); 
  });
}