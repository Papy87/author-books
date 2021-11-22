const dotenv = require('dotenv');
dotenv.config();


const DB_CONFIG = {
    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: '5432',
        dialect: 'postgres',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        dialectOption: {
            ssl: false,
            native: true
        },
        logging: false
    },
    test: {
        database: 'book',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        dialect: 'postgres'
    },
};

module.exports = {
    DB_CONFIG,
};
