const express = require('express');
const router = express.Router();
const controller = require('../controller/Cindex');
const initController = require('../controller/Cartists');


router.get('/classificationID', controller.getClassificationID);
router.get('/artists', controller.getArtists);
// router.post('/login', controller.postLogin);
router.get('/initArtist', initController.getArtistsInit);


module.exports = router;