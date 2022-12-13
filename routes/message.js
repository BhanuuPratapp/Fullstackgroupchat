const express = require('express');
const fs = require('fs')
const path = require('path')
const router = express.Router();
const rootDir = require('../util/path')
const controllerforgetChats = require('../controllers/forLogin.js')
router.get('/',controllerforgetChats.getChats)

router.post('/',controllerforgetChats.postChats)


module.exports=router ;
