const express = require('express');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/list/:id?', tripsController.list);

router.get('/countries', tripsController.countries);

router.get('/files/:tripId', tripsController.files);

router.post('/map', tripsController.saveMap);
router.get('/map/:mapId', tripsController.map);

router.get('/user/:id', tripsController.userData);

module.exports = router;