const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const guard = (isAdmin) => {
    return (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.DB_SECRET);
        if (!req.headers.authorization) {
            return res.status(400).json({
                message: 'Token no provided.'
            })
        }

        if (isAdmin && !decodedToken.isAdmin) {
            return res.status(403).json({
                message: 'Forbidden'
            })
        } else {
            next()
        }
    };
};


module.exports = guard;
