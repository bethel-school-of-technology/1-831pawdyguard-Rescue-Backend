const express = require("express");

const VolunteerController = require('../controllers/volunteer');

const router = express.Router();

router.post('', VolunteerController.saveVolunteer);


module.exports = router;