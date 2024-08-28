const express = require('express');
const router = express.Router();
const controller = require('../controller/Cindex');
const initController = require('../controller/Cartists');
const detailController = require('../controller/CartistDetail');


router.get('/classificationID', controller.getClassificationID);
router.get('/artists', controller.getArtists);
router.get('/initArtist', initController.getArtistsInit);
router.get('/artistDetails', detailController.getArtistDetail);


module.exports = router;