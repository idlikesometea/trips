const express = require('express');

const mapsController = require('../controllers/maps.js');
const router = express.Router();

router.get('/map/:mapId', mapsController.getMap);
router.get('/trip/:tripId', mapsController.getTrip);
router.get('/countries/', mapsController.getCountries);

router.post('/map', mapsController.postMap);

module.exports = router;