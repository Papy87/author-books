const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const isAdmin = require('../middleware/is_admin');
router.get('/books', isAdmin(false), BookController.getAllBooksForUser);
router.post('/book', isAdmin(false), BookController.addBook);
router.get('/book/:id', isAdmin(false), BookController.getABook);
router.put('/book/:id', isAdmin(false), BookController.updatedBook);
router.delete('/book/:id', isAdmin(false), BookController.deleteBook);

module.exports = router;
