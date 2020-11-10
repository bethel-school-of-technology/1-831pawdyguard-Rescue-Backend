const AdoptionRequest = require('../models/adoption');

exports.saveAdoptionReq = (req, res, next) => {
  //console.log('saveAdoptionReq()');
  const reqAdoption = new AdoptionRequest({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    timestamp: req.body.timestamp
  });

  reqAdoption.save().then(reqToAdopt => {
    //console.log(reqToAdopt );
    res.status(201).json({
      message: 'BE - Adoption Request Received'
    }); 
  });
}