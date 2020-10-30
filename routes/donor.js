const express = require("express");

const DonorController = require('../controllers/donor');

const router = express.Router();


router.post('', DonorController.saveDonor);

module.exports = router;