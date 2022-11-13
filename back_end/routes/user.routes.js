const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateOneUser);
router.put("/cv/:id", auth, upload.single('user_cv'), userCtrl.addCvToUser);
// admin
router.put("/desactive/:id", auth, userCtrl.updateUserByAdmin);
//Not deleting but updating the user to inactive
router.delete("/:id", auth, userCtrl.deleteOneUser);

module.exports = router;