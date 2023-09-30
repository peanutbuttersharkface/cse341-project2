const express = require('express');

const router = express.Router();

const bookController =  require('../controller/books');
const validation = require('../middleware/validate');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSingleBook);

//patch or post can be used to update
router.post('/', validation.saveBook, bookController.createBook);

router.put('/:id', validation.saveBook, bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;