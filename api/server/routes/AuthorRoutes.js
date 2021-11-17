const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const guard = require('../middleware/is_admin');

router.get('/authors', AuthorController.getAllAuthors);
router.post('/author',guard(true), AuthorController.addAuthor);
router.get('/author/:id', guard(true),AuthorController.getAuthor);
router.put('/author/:id',guard(true), AuthorController.updatedAuthor);
router.delete('/author/:id',guard(true), AuthorController.deleteAuthor);

module.exports = router;