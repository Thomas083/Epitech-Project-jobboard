const dbc = require("../config/db");
const db = dbc.getDB();

exports.createAdvert = (req, res) => {
  let { body, file } = req;
  if(!file) {
    delete body.advert_icon;
  }
    body = {
        ...body,
    };
    body.advert_contract = JSON.stringify(body.advert_contract)
    const sql = "INSERT INTO advertisements SET ?";
    db.query(sql, body, (err, result) => {
        if (err) {
          res.status(404).json({err})
          throw err;
        }
      // advert_id will be equal to the last inserted id, and will be reused in the next query to link the image at the correct advert
      const advert_id = result.insertId;
      if (file) {
        const sqlUpdateImage = `UPDATE advertisements SET advert_icon = '${file.filename}' WHERE advert_id = ${advert_id};`;
        db.query(sqlUpdateImage, (err, result) => {
          if(err) {
            res.status(400).json({err});
            throw err;
          }
          res.status(201).json(result);
        });
        } else {
            res.status(201).json(result);
        }
    });
}

exports.getAllAdverts = (req, res) => {
    const sql =
    "SELECT * FROM advertisements a WHERE a.advert_active=1 ORDER BY advert_publication_date DESC;";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneAdvert = (req, res, next) => {
    const { id: advert_id } = req.params;
    const sqlGetOneAdvert = `SELECT * FROM advertisement a WHERE a.advert_id = ${advert_id};`;
    db.query(sqlGetOneAdvert, (err, result) => {
      
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      
      res.status(200).json(result);
    });
  };

exports.getOneImage = (req, res, next) => {
    const { id: advert_id } = req.params;
    const sqlGetOneImage = `SELECT advert_icon FROM advertisements WHERE advert_id = ${advert_id};`;
    db.query(sqlGetOneImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if(result[0]) {
        result[0].advert_icon =
          req.protocol +
          "://" +
          req.get("host") +
          "/images/adverts/" +
          result[0].advert_icon;
      }
      res.status(200).json(result);
    });
  }

exports.updateAdvertByAdmin = (req, res, next) => {
    const {body} = req;
    const sqlUpdateAdvert = `UPDATE advertisements SET ? WHERE advert_id = ${body.advert_id};`;
    db.query(sqlUpdateAdvert, body, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  }
  // Not deleting but updating the advert to inactive
exports.deleteAdvert = (req, res) => {
    const { id: advert_id } = req.params;
    const sqlDeleteAdvert = `UPDATE advertisements SET advert_active = 0 WHERE advert_id = ${advert_id};`;
    db.query(sqlDeleteAdvert, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  }