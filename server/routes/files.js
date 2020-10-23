const express = require('express');

const filesController = require('../controllers/files.js');
const router = express.Router();

router.get('/folders/', filesController.folders);
router.get('/folders/:id', filesController.files);
router.get('/file/:id', filesController.file);

module.exports = router;