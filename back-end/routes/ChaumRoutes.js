const express = require('express');
const router = express.Router();
const ChaumController = require('../controllers/ChaumController')


router.get('/getPublicData', ChaumController.getPublicData);
router.post('/requestSignature', ChaumController.signing);
router.post('/verifySignature', ChaumController.verifying );

module.exports = router;
