const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbc = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { user_password: user_password } = req.body;
    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user_password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    if (user.user_society !=="1"){
      user.user_society = "0";
    }
    const sql = "INSERT INTO users SET ?";
    const db = dbc.getDB();
    db.query(sql, user, (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email ou numéro de téléphone déjà enregistré" });
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Failed registration", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { user_email, user_password: clearPassword } = req.body;

  const sql = `SELECT * FROM users WHERE user_email=?`;
  const db = dbc.getDB();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].user_active === 1) {
      try {
        const { user_password: hashedPassword, user_id } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ user_id }, process.env.JWT_TOKEN, {
            expiresIn: maxAge,
          });

          // httpOnly: true,
          // maxAge,
          // sameSite: true,
          // secure: true,

          // remove the password key of the response
          delete results[0].password;

          res.cookie("jwt", token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ userId: user_id }, process.env.JWT_TOKEN, {
              expiresIn: "24h",
            }),
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "Mauvaise combinaison email / mot de passe"
      })
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

exports.desactivateAccount = (req, res) => {
  const { user_id } = req.params;
  const sql = `UPDATE users SET user_active = 0 WHERE user_id = ${user_id}`;
  const db = dbc.getDB();
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
}