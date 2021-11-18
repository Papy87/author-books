const database = require('../src/models/initialize-sequlize')

class LoginService {
    static async login(username) {
        try {
            return await database.user.findOne({
                where: {username},
                raw: true,
                include: [
                    {model: database.author,
                    attributes:['id']}
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            return await database.user.create(userData);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LoginService;
