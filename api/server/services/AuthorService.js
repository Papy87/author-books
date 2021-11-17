const database = require('../src/models/initialize-sequlize');
const bcrypt = require('bcrypt');

class AuthorService {
    static async getAllAuthors(limit, offset) {
        try {
            return await database.author.findAll({
                include: [
                    {model: database.book, attributes: ['title', 'id']}
                ],
                order: [['lastName', 'DESC']],
                limit,
                offset
            });
        } catch (error) {
            throw error;
        }
    };

    static async addAuthor(firstName, lastName, email, password) {
        let hashPassword = await bcrypt.hash(password, 10);
        try {
            return database.sequelize.transaction(async t => {
                let user = await database.user.create({
                    email,
                    password: hashPassword,
                    isAdmin: false
                }, {transaction: t});
                let authorData = {
                    firstName,
                    lastName,
                    userId: user.dataValues.id,
                }
                return await database.author.create(authorData, {transaction: t})
            })

        } catch (error) {
            throw error;
        }
    };

    static async updateAuthor(id, updateAuthor) {
        try {
            const authorToUpdate = await database.author.findOne({
                where: {id: Number(id)}
            });

            if (authorToUpdate) {
                await database.author.update(updateAuthor, {where: {id: Number(id)}});
                return updateAuthor;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    static async getAuthor(id) {
        try {
            return await database.author.findOne({
                where: {id: Number(id)},
                include: [
                    {model: database.book, attributes: ['title', 'id','genre']}
                ],
            });
        } catch (error) {
            throw error;
        }
    };

    static async deleteAuthor(id) {
        try {
            const authorToDelete = await database.author.findOne({where: {id: Number(id)}, raw: true});
            if (authorToDelete) {
                return database.sequelize.transaction(async t => {
                    await database.book.destroy({where: {authorId: Number(id)}, transaction: t})
                    await database.user.destroy({where: {id: authorToDelete.userId}, transaction: t})
                    return await database.author.destroy({
                        where: {id: Number(id)}, transaction: t
                    });
                })
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    static async emailCheck(email) {
        try {
            const authorEmail = await database.user.findOne({where: {email}});
            return !!authorEmail;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthorService;
