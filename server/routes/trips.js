const path = require('path');
const express = require('express');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/:userId', tripsController.trips);
router.get('/countries/:mapId', tripsController.countries);
router.get('/files/:tripId', tripsController.files);

module.exports = router;