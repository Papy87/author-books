const AuthorService = require('../services/AuthorService');
const Utils = require('../utils/Util');
const util = new Utils();

class AuthorController {
    static async getAllAuthors(req, res) {
        try {
            const allAuthors = await AuthorService.getAllAuthors();
            if (allAuthors.length > 0) {
                util.setSuccess(200, 'Authors retrieved', allAuthors);
            } else {
                util.setSuccess(404, 'No author found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addAuthor(req, res) {
        let {firstName, lastName, email, password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        try {
            const emailCheck = await AuthorService.emailCheck(email);
            if (emailCheck) {
                util.setError(400, 'Email must be unique.');
                return util.send(res);
            }
            const createAuthor = await AuthorService.addAuthor(firstName, lastName, email, password);
           if(createAuthor){
               util.setSuccess(201, 'Author Added!', createAuthor);
           }else{
               util.setError(400, 'Author not added.');
           }
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedAuthor(req, res) {
        const alterAuthor = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateAuthor = await AuthorService.updateAuthor(id, alterAuthor);
            if (!updateAuthor) {
                util.setError(404, `Cannot find author with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Author updated', updateAuthor);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAuthor(req, res) {
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

    static async deleteAuthor(req, res) {
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

module.exports = AuthorController;
