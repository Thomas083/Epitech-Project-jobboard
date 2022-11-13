const dbc = require("../config/db");
const db = dbc.getDB();

exports.createMessage = (req, res) => {
    const message = {
        ...req.body,
    };
    const sql = "INSERT INTO job_info SET ?";
    db.query(sql, message, (err, result) => {
        if (err) {
            res.status(200).json({ message: "Failed to create message", err });
        } else {
            res.status(201).json({ message: "Message created !" });
        }
    });
}

exports.getAllMessages = (req, res) => {
    const sql = "SELECT * FROM job_info;";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
}
//Get all messages from a specific advert
exports.getMessagesAdvert = (req, res, next) => {
    const { id: id_advert } = req.params;
    const sqlGetMessagesAdvert = `SELECT * FROM job_info WHERE id_advert = ${id_advert};`;
    db.query(sqlGetMessagesAdvert, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
}

exports.updateMessageByAdmin = (req, res) => {
    const message = {
        ...req.body,
    };
    const sql = `UPDATE job_info SET ? WHERE info_id = ${message.info_id};`;
    db.query(sql, message, (err, result) => {
        if (err) {
            res.status(200).json({ message: "Failed to update message", err });
        } else {
            res.status(201).json({ message: "Message updated !" });
        }
    });
}

// Not deleting but updating the message to inactive
exports.deleteMessage = (req, res) => {
    const { id: info_id } = req.params;
    const sql = `UPDATE job_info SET job_info_active = 0 WHERE info_id = ${info_id};`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(200).json({ message: "Failed to delete message", err });
        } else {
            res.status(201).json({ message: "Message deleted !" });
        }
    });
}