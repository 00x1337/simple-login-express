const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../conn")

require('dotenv').config()


const users = sequelize.define("users", {
    username: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    }

});

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = {sequelize,users}
