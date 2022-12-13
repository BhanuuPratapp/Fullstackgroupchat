const jwt = require('jsonwebtoken');
//const User = require('../models/foruser');
const User = require('../models/user');

const authenticate = (req, res, next) => {
     
    try{
        const token = req.header('Authorization');
        const user= jwt.verify(token,'y5ZLp3zJqHIuRdw')
       
         User.findByPk(user.userid).then(user =>{
            req.user = user;
        
            next();
         })
         .catch(err => {throw new Error(err)})
    }
    catch(err){
        return res.status(401).json({success: false})
    }
}

module.exports = {
    authenticate
}