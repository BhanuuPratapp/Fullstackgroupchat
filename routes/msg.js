const express = require('express')
const messagecontroller = require('../controllers/msg')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post("/sendmsg", userauthentication.authenticate, messagecontroller.sendmsg);
router.get("/getmessages",  messagecontroller.getmessages)
router.get("/getallmessages", messagecontroller.getallmessages);
router.get("/getgroupmessages", userauthentication.authenticate, messagecontroller.getgroupmessages);
router.get("/getfiles", userauthentication.authenticate, messagecontroller.getfiles);
router.get("/getfilecontents", userauthentication.authenticate, messagecontroller.filecontents);


module.exports = router;