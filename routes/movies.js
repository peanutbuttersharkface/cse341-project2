const express = require('express');

const router = express.Router();

const movieController =  require('../controller/movies');

router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getSingleMovie);

//patch or post can be used to update
router.post('/', movieController.createMovie);

router.put('/:id', movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;