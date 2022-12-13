const express = require('express')
const messagecontroller = require('../controllers/msg')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post("/sendmsg", userauthentication.authenticate, messagecontroller.sendmsg);
router.get("/getmessages",  messagecontroller.getmessages)
router.get("/getallmessages", messagecontroller.getallmessages);
router.get("/getgroupmessages", userauthentication.authenticate, messagecontroller.getgroupmessages);

module.exports = router;