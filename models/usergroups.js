const Sequelize = require('sequelize');

const sequelize = require('../util/database');
//const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
const usergroups = sequelize.define('userGroups', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
})

module.exports = usergroups;