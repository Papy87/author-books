const BookService = require('../services/BookService');
const Utils = require('../utils/Util');
const jwtDecode = require('jwt-decode');

const util = new Utils();

class BookController {
    static async getAllBooks(req, res) {
        const {page, pageSize} = req.query;
        const limit = parseInt(pageSize);
        const offset = parseInt(page) * parseInt(pageSize);
        try {
            const allBooks = await BookService.getAllBooks(limit,offset);
            if (allBooks.length > 0) {
                util.setSuccess(200, 'Books retrieved', allBooks);
            } else {
                util.setSuccess(200, 'No book found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addBook(req, res) {
        let {authorId} = jwtDecode(req.headers.authorization.slice(6));
        let {title, description, genre} = req.body;
        if (!title || !description || !genre) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        try {
            const createdBook = await BookService.addBook(title, description, genre, authorId);
            util.setSuccess(201, 'Book Added!', createdBook);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedBook(req, res) {
        const alteredBook = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateBook = await BookService.updateBook(id, alteredBook);
            if (!updateBook) {
                util.setError(404, `Cannot find book with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Book updated', updateBook);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getABook(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const theBook = await BookService.getABook(id);

            if (!theBook) {
                util.setError(404, `Cannot find book with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Book', theBook);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteBook(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const bookToDelete = await BookService.deleteBook(id);

            if (bookToDelete) {
                util.setSuccess(200, 'Book deleted');
            } else {
                util.setError(404, `Book with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

module.exports = BookController;
