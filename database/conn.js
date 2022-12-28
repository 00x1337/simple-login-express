const {Sequelize} = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.SQL_DB_NAME,
    process.env.SQL_USERNAME,
    process.env.SQL_PASSWORD,

    {
        host: process.env.SQL_HOST,
        port:process.env.SQL_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        pool: {
            maxConnections: 5,
            maxIdleTime: 30
        }
    },

);
console.log(process.env.PORT || 3306)
module.exports = {sequelize}