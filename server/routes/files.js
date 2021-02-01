const express = require('express');

const filesController = require('../controllers/files.js');
const router = express.Router();

router.get('/folders/', filesController.folders);

module.exports = router;