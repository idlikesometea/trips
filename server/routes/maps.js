const express = require('express');

const mapsController = require('../controllers/maps.js');
const router = express.Router();

router.get('/map/:mapId', mapsController.getMap);
router.get('/trip/:tripId', mapsController.getTrip);

router.post('/map', mapsController.postTrip);

module.exports = router;