const express = require('express');
const router = express.Router();
const movieController =  require('../controller/movies');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getSingleMovie);


//patch or post can be used to update
router.post('/', isAuthenticated, validation.saveMovie, movieController.createMovie);
router.put('/:id', isAuthenticated, validation.saveMovie, movieController.updateMovie);
router.delete('/:id', isAuthenticated, movieController.deleteMovie);

module.exports = router;