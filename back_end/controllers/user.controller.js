const bcrypt = require("bcrypt");
const dbc = require("../config/db");
const db = dbc.getDB();

// RUD users
exports.getAllUsers = (req, res, next) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) res.status(404).json(err);
    else {
      result.forEach((user) => {
        delete user.password;
      });
      res.status(200).json(result);
    }
  });
};

exports.getOneUser = (req, res, next) => {
  const { id: userId } = req.params;
  console.dir(req.params);
  const sqlGetUser = `SELECT * FROM users WHERE users.user_id = ${userId};`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].password;
    res.status(200).json(result);
  });
};

// added cv to user
exports.addCvToUser = (req, res, next) => {
  const { id: userId } = req.params;
  const { file } = req;
  // if no file is sent, the user will not be updated
  if (!file) {
    res.status(400).json({ message: "No file sent" });
  } else {
    const sqlUpdateUser = `UPDATE users SET user_cv = '${file.filename}' WHERE user_id = ${userId};`;
    db.query(sqlUpdateUser, (err, result) => {
      if (err) {
        res.status(400).json({ err });
        throw err;
      }
      res.status(201).json(result);
    });
  };
};

exports.updateOneUser = async (req, res, next) => {
  const { user_firstname, user_lastname, user_email, user_password, user_phone } = req.body;
  const { id: userId } = req.params;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(user_password, salt);
  const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}", user_email = "${user_email}", user_password = "${encryptedPassword}", user_phone = "${user_phone}" WHERE user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.updateUserByAdmin = (req, res, next) => {
  const { body } = req;
  console.dir(body)
  const sqlUpdateUser = `UPDATE users SET ? WHERE user_id = ${body.user_id};`;
  db.query(sqlUpdateUser, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
}

//Not deleting but updating the user to inactive
exports.deleteOneUser = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlDeleteUser = `UPDATE users SET user_active = 0 WHERE user_id = ${user_id};`;
  db.query(sqlDeleteUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
}