const express = require('express');

const router = express.Router();

const bookController =  require('../controller/books');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSingleBook);

//patch or post can be used to update
router.post('/', bookController.createBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;