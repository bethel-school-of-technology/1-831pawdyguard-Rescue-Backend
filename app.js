const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const volunteerRoutes = require('./routes/volunteer');
const userRoutes = require("./routes/user");
const animalsRoutes = require('./routes/animals');

const app = express();

//*****  connect application to mongodb /cloud  *****
mongoose
  // .connect(
  //   'mongodb+srv://michelleb:<PASSWORD>@cluster0.0y9ug.mongodb.net/<dbname>?retryWrites=true&w=majority',
  //   { useUnifiedTopology: true, useNewUrlParser: true }
  // )
  mongoose.connect('mongodb+srv://g-mein710:ejYNcQMbK5GRNT82@cluster0.puxeb.mongodb.net/animal-rescue',
 { useUnifiedTopology: true, useNewUrlParser: true })
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
  //Enabling CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

/* api end-points moved to routes folder*/
app.use("/api/user", userRoutes);
app.use('/animalsPage', animalsRoutes);
app.use('/api/newVol', volunteerRoutes);

// ***** Exports our express app to use it in server.js *****
module.exports = app;
