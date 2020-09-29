const path = require('path');
const express = require('express');

const tripsController = require('../controllers/trips.js');
const router = express.Router();

router.get('/files/:folderId', tripsController.files);
router.get('/file/:fileId', tripsController.file);

module.exports = router;