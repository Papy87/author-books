const database = require('../src/models/initialize-sequlize')

class LoginService {
    static async login(email) {
        try {
            return await database.user.findOne({where: {email}});
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
