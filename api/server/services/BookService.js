const database = require('../src/models/initialize-sequlize')
let {Sequelize, Op} = require('sequelize');
const moment = require("moment");

class BookService {

    static async getAllBooks(limit, offset, authorId, title) {
        try {
            let where = {
                author_id: Number(authorId)
            };
            if (title.length) {
                let tokens = title.split(' ');
                let titleTokensArray = [];
                tokens.forEach((token) => {
                    let tokenObject = {
                        [Op.iLike]: '%' + token.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D").replace(/đ/g, "d") + '%'
                    };
                    titleTokensArray.push(tokenObject)
                })
                where.title = Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('title')), {
                    [Op.and]: [...titleTokensArray]
                })
            }
            return await database.book.findAndCountAll({
                where,
                include:
                    [{
                        model: database.author,
                    }],
                order: [
                    [
                        'title', 'ASC'
                    ]
                ],
                limit, offset
            });
        } catch (error) {
            throw error;
        }
    }

    static async addBook(title, description, genre, authorId) {
        let createdAt = moment();
        try {
            return await database.book.create({title, description, genre, authorId, createdAt});
        } catch (error) {
            throw error;
        }
    }

    static
    async updateBook(id, updateBook) {
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

    static
    async getABook(id) {
        try {
            return await database.book.findOne({
                where: {id: Number(id)},
                include:
                    [{
                        model: database.author,
                    }]
            });
        } catch (error) {
            throw error;
        }
    }

    static
    async deleteBook(id) {
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
