const express = require('express');

const auth = require('../utils/auth');

const dashboardController = require('../controllers/dashboard.js');
const router = express.Router();

router.get('/generals/', auth, dashboardController.getGenerals);
router.get('/maps/', auth, dashboardController.getMaps);
router.get('/stats/', auth, dashboardController.getStats);

module.exports = router;