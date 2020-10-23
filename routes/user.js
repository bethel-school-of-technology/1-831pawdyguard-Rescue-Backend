const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User Created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }); 
  });

  router.post("/login", (req,res,next) => {
      let fetchedUser;
      //email in DB matches email attached to req
      User.findOne({email: req.body.email })
      .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Auth Failed!"
            });
        }
        fetchedUser = user;
        //found user - compare input to encrypted password 
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) { //false no match
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        //creates token
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            "secret_phrase_for_creating_hashes", 
            { expiresIn: "1h" }
            );  
            res.status(200).json({
                token: token
            });     
     })
  .catch(err => {
      return res.status(401).json({
          message: "Auth Failed"
      });
  });
});
module.exports = router;