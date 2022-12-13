

const express = require('express');

//const expenseController = require('../controllers/expense');
const userController = require('../controllers/users');
//const userauthentication = require('../middleware/auth')
const router = express.Router();

//router.post('/add-users', userauthentication.authenticate,expenseController.postAddUser )

//router.get('/get-users', userauthentication.authenticate, expenseController.getUser )

//router.post('/delete-users', userauthentication.authenticate, expenseController.deleteUser)

router.post('/sign-up', userController.postSignUp)
//router.get('/sign-up', userController.getSignUp)

router.post('/log-in', userController.postLogin )
module.exports = router;