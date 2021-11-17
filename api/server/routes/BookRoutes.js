const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const guard = require('../middleware/is_admin');


router.get('/author/books', guard(false), BookController.getAllAuthorsAndBooks);
router.post('/book', guard(false), BookController.addBook);
router.get('/book/:id', guard(false), BookController.getABook);
router.put('/book/:id', guard(false), BookController.updatedBook);
router.delete('/book/:id', guard(false), BookController.deleteBook);

module.exports = router;
