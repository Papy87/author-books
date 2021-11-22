const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const guard = require('../middleware/is_admin');

router.get('/authors', AuthorController.getAllAuthors);
router.get('/author/:id',AuthorController.getAuthor);
router.post('/author',guard(true), AuthorController.addAuthor);
router.put('/author/:id',guard(true), AuthorController.updatedAuthor);
router.delete('/author/:id',guard(true), AuthorController.deleteAuthor);

module.exports = router;
