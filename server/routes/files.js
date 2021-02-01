const express = require('express');

const filesController = require('../controllers/files.js');
const router = express.Router();

router.get('/files/:id', filesController.getFiles);

module.exports = router;