const express = require('express');
const router = express.Router();
const SchnorrController = require('../controllers/SchnorrController')


router.post('/register', SchnorrController.register);
router.post('/login', SchnorrController.login);
router.post('/verify', SchnorrController.verifyResponse);


module.exports = router;