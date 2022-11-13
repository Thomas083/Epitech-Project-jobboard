const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message.controller");
const auth = require("../middlewares/auth.middleware");

// messages CRUD
router.get("/allmessages", auth, messageCtrl.getAllMessages);
router.get("/:id", auth, messageCtrl.getMessagesAdvert);
router.post("/:id", auth, messageCtrl.createMessage);
//admin
router.put("/:id", auth, messageCtrl.updateMessageByAdmin);
// Not deleting but updating the message to inactive
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;