const express = require('express');
const router = express.Router();
const controller = require('../controller/Cindex');


router.get('/classificationID', controller.getClassificationID);
router.get('/artists', controller.getArtists);
// router.post('/login', controller.postLogin);


module.exports = router;