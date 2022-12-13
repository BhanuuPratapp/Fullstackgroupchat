const express = require('express')
const groupscontroller = require('../controllers/group')
const userauthentication = require('../middleware/auth')
const grouprouter = express.Router();



grouprouter.post("/creategroup", userauthentication.authenticate, groupscontroller.creategroup);
grouprouter.get("/getgroups", userauthentication.authenticate, groupscontroller.getgroups);
grouprouter.post("/addusertogroup", userauthentication.authenticate, groupscontroller.addusertogroup);
grouprouter.post("/removeuserfromgroup", userauthentication.authenticate, groupscontroller.removeuserfromgroup);



module.exports = grouprouter