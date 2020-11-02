const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const volunteerRoutes = require('./routes/volunteer');
const animalsRoutes = require('./routes/animals');
const donorRoutes = require('./routes/donor');

const app = express();

//*****  connect application to mongodb /cloud  *****
mongoose
  .connect(
    'mongodb+srv://michelleb:gDc0HmztGIRPyjee@cluster0.0y9ug.mongodb.net/PGRescue?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('Connection to MongoDB established!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/animal-images', express.static(path.join('backend/animal-images')));
// app.use('/images', express.static(path.join('/animal-images')));

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

app.use('/api/user', userRoutes);
app.use('/api/animals', animalsRoutes);
app.use('/api/newVol', volunteerRoutes);
app.use('/api/newDonor', donorRoutes);

// ***** Exports our express app to use it in server.js *****
module.exports = app;
