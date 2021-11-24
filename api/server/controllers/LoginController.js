const LoginService = require('../services/LoginService');
const AuthorService = require('../services/AuthorService');
const Utils = require('../utils/Util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const util = new Utils();


class LoginController {
    static async login(req, res) {
        let {username, password} = req.body;
        if (!username ||  !password) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }
        try {
            const user = await LoginService.login(username);
            if (!user) {
                util.setError(400, "Wrong username");
                return util.send(res);
            }
            let passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                util.setError(400, "Wrong password");
                return util.send(res);
            }

            let token = jwt.sign(
                {
                    username: user.username,
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    authorId: user['author.id']
                }, process.env.DB_SECRET, {expiresIn: '24h'}
            )
            util.setSuccess(200, 'User login successful.', {token});
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async register(req, res) {
        let {username, password} = req.body;
        if (!username  || !password) {
            util.setSuccess(400, 'Please enter the necessary information.',{});
            return util.send(res);
        }
        try {
            let userNameChek = await AuthorService.userNameCheck(username);
            if (userNameChek) {
                util.setSuccess(400, 'Username must be unique.');
                return util.send(res);
            }
            let hashPassword = await bcrypt.hash(password, 10);
            let userData = {username, password: hashPassword, isAdmin: true};
            const registration = await LoginService.register(userData)
            if (registration) {
                util.setSuccess(200, 'User registration successful.');
            } else {
                util.setSuccess(400, 'User registration failed.');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

module.exports = LoginController;
