const database = require('../src/models/initialize-sequlize')

class BookService {
    static async getAllBooks(limit,offset) {

        try {
            return await database.book.findAll({
                include:
                    [{
                        model: database.author,
                        attributes: [['first_name', 'firstName'], ['last_name', 'lastName']]
                    }],
                order:[
                    [
                     'title','ASC'
                    ]
                ],
                limit,offset
            });
        } catch (error) {
            throw error;
        }
    }

    static async addBook(title, description, genre, authorId) {
        try {
            return await database.book.create({title, description, genre, authorId});
        } catch (error) {
            throw error;
        }
    }

    static async updateBook(id, updateBook) {
        try {
            const bookToUpdate = await database.book.findOne({
                where: {
                    id: Number(id)
                }
            });
            if (bookToUpdate) {
                await database.book.update(updateBook, {where: {id: Number(id)}});
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
                where: {id: Number(id)},
                include:
                    [{
                        model: database.author,
                        attributes: [['first_name', 'firstName'], ['last_name', 'lastName']]
                    }]
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
