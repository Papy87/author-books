const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const isAdmin = require('../middleware/is_admin');
const guard = require('../middleware/guard');

router.get('/authors', guard(), AuthorController.getAllAuthors);
router.get('/author/:id', guard(), AuthorController.getAuthor);
router.post('/author', isAdmin(true), AuthorController.addAuthor);
router.put('/author/:id', isAdmin(true), AuthorController.updatedAuthor);
router.delete('/author/:id', isAdmin(true), AuthorController.deleteAuthor);

module.exports = router;
