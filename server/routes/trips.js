const express = require('express');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/trips/:id?', tripsController.getTrips);
router.post('/trips/:id?', tripsController.saveTrip);

router.get('/countries', tripsController.countries);

router.post('/map', tripsController.saveMap);
router.get('/map/:mapId', tripsController.map);

router.get('/user/:id', tripsController.userTrips);

module.exports = router;