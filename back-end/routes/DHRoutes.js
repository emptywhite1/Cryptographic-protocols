const express = require('express');
const router = express.Router();
const DHController = require('../controllers/DHController')

// Define your routes here
router.post('/getServerKey', DHController.getServerKey);

module.exports = router;