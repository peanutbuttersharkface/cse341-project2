const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/movies', require('./movies'));

module.exports = router;