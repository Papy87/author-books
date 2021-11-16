const LoginService = require('../services/LoginService');
const AuthorService = require('../services/AuthorService');
const Utils = require('../utils/Util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let {DB_SECRET}=require('../src/config/config');

const util = new Utils();
// let DB_SECRET = "HMeuwN4kLhYI5UXa39w5WU.EK?3j=ihY!LDZALUc8bqi.=Djak3Xqu6Z4zgr3zJfYJVFaCotHHDORN.kUgj1tnrE5jpkvxAFY93fEC5.1FygTo1PW0WeRvoctMk.PyajcpdPC6PDk0KhoQEAJ34jQ2GuMc1JyfvmfDL5tCxKCGMy0SnKVqXDN.lRRNyqlk0dgP6Z0Zz=w5vVYjZF1NgvFSK?adqGoDqRu4cnPCAyvRzRI6o9X!UhW0CissLbVfF3i!D?ZrBAo2Qxw=Ujgb=V?M!e6rmH1ciLt2WLR8tnEzoiFvUUjL16qdtvmE1rX7KqZJAizAu9y36w.IHs41aVLs?qTAjkpnYlhOAUSX8EzXoyx3!bed1x5.?6u!ZYEPl2dksY5ns0RFGOGkiZdT!Ku0t7I0AEgVJqPvgvBFDEK2!WrJypl?d6NohvjtvaH8ditwgftvozJEoha5oDf5anv!E3nBoi5Y?13cwT12BNPR2FyHLbemCbSOqZ6!8oMQfE";

class LoginController {
    static async login(req, res) {
        let {email, password} = req.body;
        if (!email || !password) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }
        try {
            const user = await LoginService.login(email);
            if(!user){
                util.setError(400, "Wrong Email");
                return util.send(res);
            }
            let passwordCheck= await bcrypt.compare(password,user.dataValues.password);
            if(!passwordCheck){
                util.setError(400, "Wrong password");
                return util.send(res);
            }
            let token= jwt.sign(
                {
                    userId: user.dataValues.id,
                    isAdmin: user.dataValues.isAdmin,
                },DB_SECRET, {expiresIn: '24h'}
            )
            util.setSuccess(200, 'User login successful.',{token});
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async register(req, res) {
        let {email, password} = req.body;
        if (!email || !password) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }
        try {
            let userEmailChek = await AuthorService.emailCheck(email);
            if (userEmailChek) {
                util.setSuccess(400, 'Email must be unique.');
                return util.send(res);
            }
            let hashPassword= await bcrypt.hash(password, 10);
            let userData = {email, password:hashPassword,isAdmin:true};
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
