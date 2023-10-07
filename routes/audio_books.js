const express = require('express');
const router = express.Router();

const audioController =  require('../controller/audio_books');
//const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', audioController.getAllAudio);

router.get('/:id', audioController.getSingleAudio);

router.post('/', isAuthenticated, audioController.createAudio);

router.put('/:id', isAuthenticated, audioController.updateAudio);

router.delete('/:id', isAuthenticated, audioController.deleteAudio);

module.exports = router;