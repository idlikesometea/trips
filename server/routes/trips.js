const express = require('express');

const auth = require('../utils/auth');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/countries', tripsController.countries);

router.get('/dashboard/', auth, tripsController.dashboard);
router.get('/trips/:id?', auth, tripsController.getTrips);
router.post('/trips/:id?', auth, tripsController.saveTrip);

router.post('/map', tripsController.saveMap);
router.get('/map/:mapId', tripsController.map);


module.exports = router;