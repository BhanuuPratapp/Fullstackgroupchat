const Sequelize = require('sequelize');

const sequelize = require('../util/database');
//const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
const messagetable = sequelize.define('message', {
    msgid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    Username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
         }
    }

})

module.exports = messagetable;