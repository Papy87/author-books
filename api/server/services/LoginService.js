const database = require('../src/models/initialize-sequlize')
const moment = require("moment");
class LoginService {
    static async login(username) {
        try {
            return await database.user.findOne({where: {username},
                raw: true,
                include: [{model: database.author, attributes: ['id']}]
            });
        } catch (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            let {username, password,isAdmin} = userData;
            let createdAt = moment();
            return await database.user.create({username, password,isAdmin, createdAt});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LoginService;
