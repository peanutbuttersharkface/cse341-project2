const express = require('express');
const router = express.Router();

const audioController =  require('../controller/audio_books');
const validation = require('../middleware/validate');

router.get('/', audioController.getAllAudio);

router.get('/:id', audioController.getSingleAudio);

router.post('/', validation.saveAudio, audioController.createAudio);

router.put('/:id', validation.saveAudio, audioController.updateAudio);

router.delete('/:id', audioController.deleteAudio);

module.exports = router;