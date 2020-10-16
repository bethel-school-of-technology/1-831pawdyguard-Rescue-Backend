const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Animal = require('./models/animal');

const app = express();

mongoose
  .connect(
    'mongodb+srv://michelleb:gDc0HmztGIRPyjee@cluster0.0y9ug.mongodb.net/PGRescue?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/animalsPage', (req, res, next) => {
  const animal = new Animal({
    title: req.body.title,
    content: req.body.content,
  });
  animal.save();
  res.status(201).json({
    message: 'Animal added successfully!',
  });
});

app.get('/animalsPage', (req, res, next) => {
  const animals = [
    {
      id: 'abcd123',
      title: 'first server side post',
      content: 'coming from the server',
    },
    {
      id: 'abcd456',
      title: 'second server side post',
      content: 'coming from the server twice',
    },
    {
      id: 'abcd789',
      title: 'third server side post',
      content: 'coming from the server thrice',
    },
  ];
  res.status(200).json({
    message: 'Animals fetched successfully!',
    animals: animals,
  });
});

// ***** Add new volunteer *****
app.post('/api/newVol', (req,res,next) => {
  const newVolunteer = req.body;
  console.log(newVolunteer);
  res.status(201).json({
    message: 'Volunteer application received'
  });
});

// ***** *****
module.exports = app;
