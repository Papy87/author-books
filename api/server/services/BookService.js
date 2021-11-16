const database = require('../src/models/initialize-sequlize')

class BookService {
    static async getAllBooks() {
        try {
            return await database.book.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addBook(newBook) {
        try {
            return await database.book.create(newBook);
        } catch (error) {
            throw error;
        }
    }

    static async updateBook(id, updateBook) {
        try {
            const bookToUpdate = await database.book.findOne({
                where: {id: Number(id)}
            });

            if (bookToUpdate) {
                await database.Book.update(updateBook, {where: {id: Number(id)}});

                return updateBook;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getABook(id) {
        try {
            return await database.book.findOne({
                where: {id: Number(id)}
            });
        } catch (error) {
            throw error;
        }
    }

    static async deleteBook(id) {
        try {
            const bookToDelete = await database.book.findOne({where: {id: Number(id)}});

            if (bookToDelete) {
                return await database.book.destroy({
                    where: {id: Number(id)}
                });
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookService;
