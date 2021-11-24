const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Util = require("../utils/Util");
dotenv.config();
const util = new Util;

const isAdmin = (isAdmin) => {
    return (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        if (!req.headers.authorization) {
            util.setError(400, 'Token no provided.')
            return util.setSuccess(res)
        }
        let decodedToken = jwt.verify(token, process.env.DB_SECRET);
        if (isAdmin && !decodedToken.isAdmin) {
            util.setError(403, 'Forbidden.')
            return util.setSuccess(res)
        } else {
            next()
        }
    };
};


module.exports = isAdmin;
