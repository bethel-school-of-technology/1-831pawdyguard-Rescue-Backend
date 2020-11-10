const Donor = require('../models/donor');

exports.saveDonor = (req, res, next) => {
  //console.log('Timestamp: '+ req.body.timestamp);
  const donor = new Donor({
    fname: req.body.fname,
    lname: req.body.lname,
    street: req.body.street,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    phone: req.body.phone,
    wantsLetter: req.body.wantsLetter,
    timestamp: req.body.timestamp
  });

  donor.save().then(newDonor => {
    //console.log(newDonor);
    res.status(201).json({
      message: 'Donor information received'
    }); 
  });
}