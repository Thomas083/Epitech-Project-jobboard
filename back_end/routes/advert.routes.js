const express = require("express");
const router = express.Router();
const advertCtrl = require("../controllers/advert.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config")

// Post CRUD
router.post("/", auth, upload.single('advert_icon'), advertCtrl.createAdvert)
router.get("/", auth, advertCtrl.getAllAdverts);
router.get("/:id", auth, advertCtrl.getOneAdvert);
// admin
router.put("/:id", advertCtrl.updateAdvertByAdmin);
// Not deleting but updating the advert to inactive
router.delete("/:id", auth, advertCtrl.deleteAdvert);

// Images
router.get("/image/:id", auth, advertCtrl.getOneImage);

module.exports = router;
