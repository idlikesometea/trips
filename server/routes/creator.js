const express = require('express');

const auth = require('../utils/auth');

const creatorController = require('../controllers/creator.js');
const router = express.Router();

router.get('/map/:mapId', auth, creatorController.getMap);
router.get('/trips/:mapId', auth, creatorController.getTrips);
router.get('/trip/:tripId', auth, creatorController.getTrip);

router.post('/map/:mapId?', auth, creatorController.postMap);
router.post('/trip/:tripId?', auth, creatorController.postTrip);

router.delete('/map/:mapId', auth, creatorController.deleteMap);
router.delete('/trip/:tripId', auth, creatorController.deleteTrip);

module.exports = router;