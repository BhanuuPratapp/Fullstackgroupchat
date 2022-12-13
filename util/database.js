const Sequelize = require('sequelize');



const sequelize = new Sequelize('groupchatapplication', 'root', 'Bhanu@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;