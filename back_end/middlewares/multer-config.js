// multer
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if ( file.fieldname === "advert_icon") cb (null, "./images/adverts/");
    else if ( file.fieldname === "profil_image") cb (null, "./images/profils/")
    else if ( file.fieldname === "user_cv") cb (null, "./images/CVs/")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;