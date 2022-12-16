const Sequelize = require('sequelize');

const sequelize = require('../util/database');
//const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
const fileuploadtable = sequelize.define('fileupload', {
    uploadid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
   filename: {
    type: Sequelize.STRING,
    allowNull: false,
   }
    
    

})

module.exports = fileuploadtable;