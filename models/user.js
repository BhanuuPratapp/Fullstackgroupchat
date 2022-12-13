const Sequelize = require('sequelize');

const sequelize = require('../util/database');
//const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
const Signup = sequelize.define('forsignup', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type:Sequelize.STRING,
    allowNull: false,
   
  }, 
       
     
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  
phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
   
},

  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  
 
});

module.exports = Signup;
