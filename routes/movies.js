const express = require('express');
const router = express.Router();

const movieController =  require('../controller/movies');
const validation = require('../middleware/validate');

router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getSingleMovie);


//patch or post can be used to update
router.post('/', validation.saveMovie, movieController.createMovie);
//router.post('/', movieController.createMovie);
router.put('/:id', validation.saveMovie, movieController.updateMovie);
//router.put('/:id', movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;