const Sequelize = require('sequelize');

const sequelize = require('../util/database');
//const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
const grouptable = sequelize.define('Groups', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      groupname: {
        type: Sequelize.STRING,
        allowNull: false,
      }
})

module.exports = grouptable;