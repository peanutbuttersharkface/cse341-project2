const express = require('express');
const router = express.Router();

const bookController =  require('../controller/books');
//const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getSingleBook);

//patch or post can be used to update
router.post('/', isAuthenticated, bookController.createBook);
router.put('/:id', isAuthenticated, bookController.updateBook);
router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;