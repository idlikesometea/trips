const express = require('express');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/countries', tripsController.countries);
router.get('/list', tripsController.list);
router.get('/map/:mapId', tripsController.map);
router.get('/files/:tripId', tripsController.files);
router.post('/map', tripsController.saveMap);
router.get('/user/:id', tripsController.userData);

module.exports = router;