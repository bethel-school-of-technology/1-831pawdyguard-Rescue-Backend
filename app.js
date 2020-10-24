const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Volunteer = require('./models/volunteer');

const userRoutes = require('./routes/user');
const animalsRoutes = require('./routes/animals');

const app = express();

//*****  connect application to mongodb /cloud  *****
mongoose
  .connect(
    'mongodb+srv://michelleb:gDc0HmztGIRPyjee@cluster0.0y9ug.mongodb.net/PGRescue?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connection to MongoDB established!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

//CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// ***** Add new volunteer *****
app.post('/api/newVol', (req, res, next) => {
  //old version without data model
  //const newVolunteer = req.body;
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
    skills: req.body.skills,
  });

  volunteer.save();
  //console.log(newVolunteer);
  //console.log(volunteer);
  res.status(201).json({
    message: 'Volunteer application received',
  });
});

app.use('/api/user', userRoutes);
app.use('/animalsPage', animalsRoutes);

// ***** Exports our express app to use it in server.js *****
module.exports = app;
