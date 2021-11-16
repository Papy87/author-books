const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/books', BookController.getAllBooks);
router.post('/book', BookController.addBook);
router.get('/book/:id', BookController.getABook);
router.put('/book/:id', BookController.updatedBook);
router.delete('/book/:id', BookController.deleteBook);

module.exports = router;
