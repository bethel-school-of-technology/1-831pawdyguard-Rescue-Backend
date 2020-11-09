const express = require("express");
const AdoptionController = require('../controllers/adoption');
const router = express.Router();


router.post('', AdoptionController.saveAdoptionReq);


module.exports = router;