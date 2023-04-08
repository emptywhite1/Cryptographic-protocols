const express = require('express');
const router = express.Router();
const DHController = require('../controllers/DHController')


router.post('/getServerKey', DHController.getServerKey);

module.exports = router;