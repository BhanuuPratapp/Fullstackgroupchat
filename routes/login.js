const express = require('express');
const fs = require('fs');
//const path = require('path')

//const rootDir = require('../util/path')
const controllerforadmin = require('../controllers/forLogin.js')

const router = express.Router();

router.get('/login',controllerforadmin.getLogin)

router.post('/login',controllerforadmin.postLogin)

module.exports = router;