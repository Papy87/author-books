const database = require('../src/models/initialize-sequlize');
const {Op, Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const moment = require("moment");

class AuthorService {
    static async getAllAuthors(limit, offset, authorId, name) {
        let where = {};
        if (authorId) {
            where.id = {
                [Op.ne]: authorId
            }
        }
        if (name.length) {
            let tokens = name.split(' ');
            let nameTokensArray = [];
            tokens.forEach((token) => {
                let tokenObject = {
                    [Op.iLike]: '%' + token.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D").replace(/đ/g, "d") + '%'
                };
                nameTokensArray.push(tokenObject)
            })
            where.fullName = Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('full_name')), {
                [Op.and]: [...nameTokensArray]
            })
        }
        try {
            return await database.author.findAndCountAll({
                where,
                include: [
                    {model: database.book, attributes: ['title', 'id']}
                ],
                order: [['fullName', 'DESC']],
                limit,
                offset
            });
        } catch (error) {
            throw error;
        }
    }
    ;

    static async addAuthor(fullName, email, password, username) {
        let hashPassword = await bcrypt.hash(password, 10);
        let createdAt = moment();
        try {
            return database.sequelize.transaction(async t => {
                let user = await database.user.create({
                    password: hashPassword,
                    isAdmin: false,
                    username,
                    createdAt
                }, {transaction: t});
                let authorData = {
                    fullName,
                    userId: user.dataValues.id,
                    email,
                    createdAt
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
    }
    ;

    static async getAuthor(id) {
        try {
            return await database.author.findOne({
                where: {id: Number(id)},
                include: [
                    {model: database.book, attributes: ['title', 'id', 'genre']}
                ],
            });
        } catch (error) {
            throw error;
        }
    }
    ;

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
    }
    ;

    static async emailCheck(email) {
        try {
            const authorEmail = await database.author.findOne({where: {email}});
            return !!authorEmail;

        } catch (error) {
            throw error;
        }
    }

    static async userNameCheck(username) {
        try {
            const authorUsername = await database.user.findOne({where: {username}});
            return !!authorUsername;

        } catch (error) {
            throw error;
        }
    }
}

module
    .exports = AuthorService;
