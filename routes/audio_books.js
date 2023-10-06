const express = require('express');
const router = express.Router();

const audioController =  require('../controller/audio_books');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', audioController.getAllAudio);

router.get('/:id', audioController.getSingleAudio);

router.post('/', isAuthenticated, validation.saveAudio, audioController.createAudio);

router.put('/:id', isAuthenticated, validation.saveAudio, audioController.updateAudio);

router.delete('/:id', isAuthenticated, audioController.deleteAudio);

module.exports = router;