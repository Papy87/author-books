const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const isAdminMiddleware = require('../middleware/is_admin');

router.get('/authors', AuthorController.getAllAuthors);
router.post('/author',isAdminMiddleware(true), AuthorController.addAuthor);
router.get('/author/:id', isAdminMiddleware(true),AuthorController.getAuthor);
router.put('/author/:id',isAdminMiddleware(true), AuthorController.updatedAuthor);
router.delete('/author/:id',isAdminMiddleware(true), AuthorController.deleteAuthor);

module.exports = router;
